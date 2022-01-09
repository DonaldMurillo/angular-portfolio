import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AppTheme } from './app.model';
import { AppStore } from './app.store';

@Injectable({ providedIn: 'root' })
export class AppService {

	constructor(private appStore: AppStore, private http: HttpClient) {
	}

	/**
	 * Toggles between light and dark theme
	 * @param theme if parameter is provided forces the theme to be provided theme.
	 */
	toggleTheme(theme?: AppTheme) {
		this.appStore.update(state => ({ ...state, theme: theme ?? (state.theme === 'dark' ? 'light' : 'dark')}));
	}

}
