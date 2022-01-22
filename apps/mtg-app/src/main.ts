import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import jwt_decode from "jwt-decode";
import { persistState } from '@datorama/akita';
import { AuthState } from './app/services/auth/auth.models';


// AKITA PERSIST STORAGE
const storage = persistState({
	key: 'mtgapp-persist',
	include: ['user', 'auth-store'], //DO NOT USE AUTH AS A NAME

	preStorageUpdate(storeName: string, state: { accessToken: string; exp: number; userType: string; }) {
		// SAVE THE TOKEN AND EXPIRATION
		if (storeName === 'auth-store') {
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
		if (storeName === 'auth-store') {
			const authUser = jwt_decode<AuthState>(state.accessToken);
			return { ...authUser, accessToken: state.accessToken, userType: authUser.userType ?? 'user' };
		}
		return state;
	},
});

const providers = [{ provide: 'persistStorage', useValue: storage }];


if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic(providers)
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));

