import { keysToCamel } from '@angular-portfolio/ts-utilities';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class SnakeToCamelInterceptor implements HttpInterceptor {
	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		req = req.clone({ responseType: 'json' });
		console.log('here')
		return next.handle(req).pipe(map(event => {
			if (event instanceof HttpResponse) {
				// const parser = new DOMParser();
				// const xml = parser.parseFromString(event.body, 'text/xml');
				event = event.clone({ body: keysToCamel(event.body) });
				console.log('event', event)
			}

			return event;
		}));
	}
}