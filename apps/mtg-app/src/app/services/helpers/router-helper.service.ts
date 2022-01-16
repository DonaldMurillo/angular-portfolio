import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map, startWith, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RouterHelperService {

	private currentRoute = new BehaviorSubject<string | undefined>(undefined);

	constructor(public readonly router: Router) {
		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				map(event => (event as NavigationEnd).url),
				startWith(this.router.url)
				).subscribe( url => {
					this.currentRoute.next(url)
				})
	}

	selectCurrentRoute(): Observable<string | undefined> {
		return this.currentRoute.asObservable();
	}
}
