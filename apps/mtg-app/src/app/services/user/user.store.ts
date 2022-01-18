import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { UserState, createInitialState } from './user.models';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user', resettable: true })
export class UserStore extends Store<UserState> {

	constructor() {
		super(createInitialState());
	}

}
