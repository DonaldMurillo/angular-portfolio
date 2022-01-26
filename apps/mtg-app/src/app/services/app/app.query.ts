import { UserQuery } from './../user/user.query';
import { AuthQuery } from './../auth/auth.query';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { AppState, AppTheme } from './app.model';
import { AppService } from './app.service';
import { AppStore } from './app.store';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AppQuery extends Query<AppState> {

	private menuItems$ = new BehaviorSubject<MenuItem[]>([]);

	constructor(
		protected override store: AppStore, 
		private service: AppService, 
		private authQuery: AuthQuery, 
		private authService: AuthService,
		private userQuery: UserQuery) {
		super(store);
		combineLatest([
			this.select('theme'),
			this.authQuery.select(),
			this.userQuery.select('theme')
		])
		.subscribe(([theme, authUser, userTheme]) => {
			const curTheme = userTheme ?? theme ?? 'light';
			const styles = document?.getElementById('darkTheme') as HTMLLinkElement;
			styles.href = `assets/styles/lara-${curTheme}-purple/theme.css`;
			this.menuItems$.next(this.setMenu(curTheme, authUser.userId ?? undefined));
		})
	}

	selectMenuItems(): Observable<MenuItem[]> {
		return this.menuItems$.asObservable();
	}

	private setMenu(theme: AppTheme, userId?: string): MenuItem[] {
		const menu = [
			{
				label: `Search`,
				icon: `pi pi-search`,
				routerLink: `search`
			},
			{
				label: `${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}`,
				icon: `pi ${theme === 'dark' ? 'pi-sun' : 'pi-moon'}`,
				command: () => {
					this.service.toggleTheme();
				}
			},
			{
				label: `${userId ? 'Account' : 'Log in'}`,
				icon: `pi pi-user`,
				routerLink: `${userId ? 'user/' + userId + '/my-account' : 'user/login'}`
			},
		]
		
		if (!userId) menu.push({
			label: `Register`,
			icon: `pi pi-user-plus`,
			routerLink: `user/signup`
		})
		else menu.push({
			label: `Log out`,
			icon: `pi pi-power-off`,
			command: () => this.authService.userLogOut()
		}) 

		return menu;
	}
}
