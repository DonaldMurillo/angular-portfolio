import { UserState } from './../user/user.models';
import { ScryfallSearchStore } from './../scryfall-search/scryfall-search.store';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthState, CreateUserCommand, UserCredentials } from './auth.models';
import { AuthStore } from './auth.store';
import jwt_decode from "jwt-decode";
import { PersistState } from '@datorama/akita';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

	private baseUrl = environment.baseUrl + '/';

	constructor(
		private authStore: AuthStore,
		private http: HttpClient,
		private router: Router,
		private messageService: MessageService,
		private scryfallStore: ScryfallSearchStore,
		private userService: UserService,
		@Inject('persistStorage') private persistStorage: PersistState) {

	}

	userSignUp(createUserCommand: CreateUserCommand): void {
		this.authStore.update(state => ({ ...state, isLoading: true }));
		this.http.post<{ accessToken: string }>(this.baseUrl + 'auth/user-signup', createUserCommand)
			.pipe(first())
			.subscribe({
				next: ({ accessToken }) => {
					const authUser = jwt_decode<AuthState>(accessToken);
					this.authStore.update({ ...authUser, accessToken: accessToken, userType: authUser.userType ?? 'user' });
					this.router.navigate(['user', authUser.userId, 'create-profile']);
				},
				error: (error: HttpErrorResponse) => {
					this.messageService.add({ key: 'tc', severity: 'error', summary: 'error', detail: error.error.message, });
					this.authStore.update(state => ({ ...state, isLoading: false }));
				},
				complete: () => {
					this.authStore.update(state => ({ ...state, isLoading: false }));
				}
			});
	}

	userLogIn(userCredentials: UserCredentials): void {
		this.authStore.update(state => ({ ...state, isLoading: true }));
		this.http.post<{ accessToken: string, profile: UserState }>(this.baseUrl + 'user-profile/sign-in', userCredentials)
			.pipe(first())
			.subscribe({
				next: ({ accessToken, profile }) => {
					const authUser = jwt_decode<AuthState>(accessToken);
					this.authStore.update({ ...authUser, accessToken: accessToken, userType: authUser.userType ?? 'user' });
					if (profile) this.userService.updateState(profile);
					this.router.navigate(['user', authUser.userId, 'my-account']);
				},
				error: (error: HttpErrorResponse) => {
					this.messageService.add({ key: 'tc', severity: 'error', summary: 'error', detail: error.error.message });
					this.authStore.update(state => ({ ...state, isLoading: false }));
				},
				complete: () => {
					this.authStore.update(state => ({ ...state, isLoading: false }));
				}
			});
	}

	userLogOut(): void {
		this.authStore.reset();
		this.persistStorage.clearStore();
		this.router.navigate(['user', 'login']).then(() => this.scryfallStore.reset());
	}

}
