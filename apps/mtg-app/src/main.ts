import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import jwt_decode from "jwt-decode";
import { persistState } from '@datorama/akita';
import { AuthState } from './app/services/auth/auth.models';


// AKITA PERSIST STORAGE
const storage = persistState({
	key: 'authStore',
	include: ['auth'], //DO NOT USE AUTH AS A NAME

	preStorageUpdate(storeName: string, state: { accessToken: string; exp: number; userType: string; }) {
		// SAVE THE TOKEN AND EXPIRATION
		if (storeName === 'auth') {
			return {
				...state,
				accessToken: state.accessToken,
				userType: state.userType ?? 'user'
			};
		}

		return state;
	},
	preStoreUpdate(storeName: string, state: { accessToken: string; }) {
		// DECODES THE TOKEN AND REHYDRATES THE STORE
		if (storeName === 'auth') {
			const authUser = jwt_decode<AuthState>(state.accessToken);
			return { ...authUser, accessToken: state.accessToken, userType: authUser.userType ?? 'user' };
		}
		return state;
	},
});

const userStorage = persistState({
	key: 'userStore',
	include: ['user'],
})

const providers = [
	{ provide: 'authPersistStorage', useValue: storage, multi: true },
	{ provide: 'userPersistStorage', useValue: userStorage, multi: true },
];


if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic(providers)
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));

