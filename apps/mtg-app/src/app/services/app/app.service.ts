import { Injectable } from '@angular/core';
import { AppTheme } from './app.model';
import { AppStore } from './app.store';
import { UserService } from '../user/user.service';
import { UserQuery } from '../user/user.query';

@Injectable({ providedIn: 'root' })
export class AppService {

	constructor(private appStore: AppStore, private userService: UserService, private userQuery: UserQuery) {
	}

	/**
	 * Toggles between light and dark theme
	 * @param theme if parameter is provided forces the theme to be provided theme.
	 */
	toggleTheme(theme?: AppTheme) {
		const userState = this.userQuery.getValue();
		if (theme && theme === userState.theme) return;
		if (userState.id) {
			this.appStore.update(state => ({ ...state, theme: theme ?? (userState.theme === 'dark' ? 'light' : 'dark')}));
			this.userService.updateProfile({theme: userState.theme === 'dark' ? 'light' : 'dark'}, true);
		}
		else this.appStore.update(state => ({ ...state, theme: theme ?? (state.theme === 'dark' ? 'light' : 'dark')}));
	}

}
