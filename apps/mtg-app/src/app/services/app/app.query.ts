import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState, AppTheme } from './app.model';
import { AppService } from './app.service';
import { AppStore } from './app.store';

@Injectable({ providedIn: 'root' })
export class AppQuery extends Query<AppState> {

	private menuItems$ = new BehaviorSubject<MenuItem[]>([])

	constructor(protected override store: AppStore, private service: AppService) {
		super(store);

		this.select('theme').subscribe(theme => {
			const styles = document?.getElementById('darkTheme') as HTMLLinkElement;
			styles.href = `assets/styles/lara-${theme}-purple/theme.css`;
			this.menuItems$.next(this.setMenu(theme))
		})
	}

	selectMenuItems(): Observable<MenuItem[]> {
		return this.menuItems$.asObservable();
	}

	private setMenu(theme: AppTheme): MenuItem[] {

		return [
			{
				label: `${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}`,
				icon: `pi ${theme === 'dark' ? 'pi-sun' : 'pi-moon'}`,
				command: () => {
					this.service.toggleTheme();
				}
			},
			{
				label: `Account`,
				icon: `pi pi-user`,
				routerLink: 'user'
			},
		]
	}
}
