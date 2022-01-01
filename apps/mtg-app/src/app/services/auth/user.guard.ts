import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthQuery } from './auth.query';

@Injectable({
	providedIn: 'root'
})
export class UserGuard implements CanActivate {

	constructor(private auth: AuthQuery, private router: Router) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const { accessToken, exp, userType, userId } = this.auth.getValue();
		const currentId = next.paramMap.get('userId');
		const isCorrectUser = currentId === null ? true : userId === currentId;
		// or if user profile is not created
		if (!accessToken.length || exp <= Date.now()/1000 || userType === 'user' || !isCorrectUser) {
			this.router.navigate(['auth', 'user-signin']);
			return false;
		}
		return true;
	}

}
