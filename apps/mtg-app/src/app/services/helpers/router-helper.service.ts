import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map, startWith, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RouterHelperService {

	private currentRoute = new BehaviorSubject<string | undefined>(undefined);

	constructor(public readonly router: Router, public readonly activadedRoute: ActivatedRoute) {
		this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				map(event => (event as NavigationEnd).url),
				startWith(this.router.url)
				).subscribe( url => {
					this.currentRoute.next(url)
				})
	}

	static getFullTreeParams(
		route: ActivatedRoute,
		params: { [key: string]: string } = {},
		isTopLevel: boolean = false): { [key: string]: string } {
		if (route.parent && !isTopLevel) return RouterHelperService.getFullTreeParams(route.parent);
		else {
			if (route) {
				params = { ...params, ...route?.snapshot?.params };
				route.children.forEach(c => params = RouterHelperService.getFullTreeParams(c, params, true))
				return params;
			}
			return params;
		}
	}

	selectCurrentRoute(): Observable<string | undefined> {
		return this.currentRoute.asObservable();
	}

	getRouteParam(param: string): string | undefined {
		const params = RouterHelperService.getFullTreeParams(this.activadedRoute);
		return params[param];
	}
}
