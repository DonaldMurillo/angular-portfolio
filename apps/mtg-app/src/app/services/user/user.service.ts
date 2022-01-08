import { MessageService } from 'primeng/api';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, first } from 'rxjs/operators';
import { CreateProfileDto, UserState } from './user.models';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserService {

	baseUrl: string = environment.baseUrl + 'user-profile/'
	constructor(private userStore: UserStore, private http: HttpClient, private messageService: MessageService) {
	}

	createProfile(createProfileDto: CreateProfileDto) {
		this.userStore.update(state => ({ ...state, isLoading: true }))
		this.http.post<UserState>(this.baseUrl + 'create-profile', createProfileDto)
			.pipe(first())
			.subscribe({
				next: (userState: UserState) => this.userStore.update(state => ({...state, ...userState})),
				error: (error: HttpErrorResponse) => {
					this.messageService.add({ key: 'tc', severity: 'error', summary: 'error', detail: error.error.message, });
					this.userStore.update(state => ({ ...state, isLoading: false }));
				},
				complete: () => this.userStore.update(state => ({ ...state, isLoading: false }))
			})
	}

}
