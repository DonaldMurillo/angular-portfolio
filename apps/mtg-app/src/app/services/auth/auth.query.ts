import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthState } from './auth.models';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {

	constructor(protected override store: AuthStore) {
		super(store);
	}

	isUserLoggedIn(): Observable<boolean> {
		return this.select('accessToken').pipe(map(a => Boolean(a)));
	}
}
