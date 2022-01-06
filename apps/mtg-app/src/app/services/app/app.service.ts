import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AppStore } from './app.store';

@Injectable({ providedIn: 'root' })
export class AppService {

	constructor(private appStore: AppStore, private http: HttpClient) {
	}

	toggleTheme() {
		this.appStore.update(state => ({ ...state, theme: state.theme === 'dark' ? 'light' : 'dark'}))
	}

}
