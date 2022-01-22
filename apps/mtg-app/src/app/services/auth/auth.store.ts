import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { AuthState, createInitialState } from './auth.models';


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth-store', resettable: true })
export class AuthStore extends Store<AuthState> {

	constructor() {
		super(createInitialState());
	}

}
