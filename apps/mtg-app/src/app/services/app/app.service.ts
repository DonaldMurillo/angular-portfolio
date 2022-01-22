import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AppTheme } from './app.model';
import { AppStore } from './app.store';
import { UserService } from '../user/user.service';
import { UserQuery } from '../user/user.query';

@Injectable({ providedIn: 'root' })
export class AppService {

	constructor(private appStore: AppStore, private http: HttpClient, private userService: UserService, private userQuery: UserQuery) {
	}

	/**
	 * Toggles between light and dark theme
	 * @param theme if parameter is provided forces the theme to be provided theme.
	 */
	toggleTheme(theme?: AppTheme) {
		const userState = this.userQuery.getValue();
		if (theme === userState.theme) return;
		if (userState.id) {
			this.userService.updateProfile({theme: theme ?? userState.theme === 'dark' ? 'light' : 'dark'}, true);
			this.appStore.update(state => ({ ...state, theme: theme ?? (userState.theme === 'dark' ? 'light' : 'dark')}));
		}
		else this.appStore.update(state => ({ ...state, theme: theme ?? (state.theme === 'dark' ? 'light' : 'dark')}));
	}

}
