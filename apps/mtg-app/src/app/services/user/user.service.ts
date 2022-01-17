import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { CreateProfileDto, UpdateProfileDto, UserState } from './user.models';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserService {

	baseUrl: string = environment.baseUrl + '/user-profile/'
	constructor(
		private userStore: UserStore, 
		private http: HttpClient, 
		private messageService: MessageService, 
		private router: Router
		) {
			//TODO: if user is logged in try and fetch profile
	}

	createProfile(createProfileDto: CreateProfileDto) {
		this.userStore.update(state => ({ ...state, isLoading: true }));
		this.http.post<UserState>(this.baseUrl + 'create-profile', createProfileDto)
			.pipe(first())
			.subscribe({
				next: (userState: UserState) => {
					this.userStore.update(state => ({...state, ...userState}));
					this.router.navigate(['my-account']);
				},
				error: (error: HttpErrorResponse) => {
					this.messageService.add({ key: 'tc', severity: 'error', summary: 'error', detail: error.error.message, });
					this.userStore.update(state => ({ ...state, isLoading: false }));
				},
				complete: () => this.userStore.update(state => ({ ...state, isLoading: false }))
			})
	}

	getProfile() {
		// this.http.get<UserState>(this.baseUrl + 'create-profile')
		// .pipe(first())
		// .subscribe({
		// 	next: (userState: UserState) => this.userStore.update(state => ({...state, ...userState})),
		// 	error: (error: HttpErrorResponse) => {
		// 		this.messageService.add({ key: 'tc', severity: 'error', summary: 'error', detail: error.error.message, });
		// 		this.userStore.update(state => ({ ...state, isLoading: false }));
		// 	},
		// 	complete: () => this.userStore.update(state => ({ ...state, isLoading: false }))
		// })
	}

	updateState(state: UserState) {
		this.userStore.update(state);
	}

	updateProfile(updateProfileDto: UpdateProfileDto) {
		//
	}

	reset() {
		this.userStore.reset();
	}
}
