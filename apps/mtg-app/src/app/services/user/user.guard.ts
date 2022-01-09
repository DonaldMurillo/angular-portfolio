import { UserQuery } from './user.query';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthQuery } from '../auth/auth.query';

@Injectable({
	providedIn: 'root'
})
export class UserGuard implements CanActivate {

	constructor(private auth: AuthQuery, private router: Router, private userQuery: UserQuery) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const { accessToken, exp, userType, userId } = this.auth.getValue();
		const currentId = next.paramMap.get('userId');
		const isCorrectUser = currentId === null ? true : userId === currentId;
		// or if user profile is not created
		if (!accessToken.length || exp <= Date.now()/1000 || userType !== 'user' || !isCorrectUser) {
			this.router.navigate(['auth', 'user-signin']);
			return false;
		}
		if (!this.userQuery.getValue().id && next.url.every(u => u.path !== 'create-profile')) {
			return this.router.navigate(['user', currentId, 'create-profile']);
		}

		return true;
	}

}
