import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AppTheme } from './app.model';
import { AppStore } from './app.store';

@Injectable({ providedIn: 'root' })
export class AppService {

	constructor(private appStore: AppStore, private http: HttpClient) {
	}

	toggleTheme(theme?: AppTheme) {
		this.appStore.update(state => ({ ...state, theme: theme ?? (state.theme === 'dark' ? 'light' : 'dark')}));
	}

}
