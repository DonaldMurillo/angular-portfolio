import { keysToCamel } from '@angular-portfolio/ts-utilities';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class SnakeToCamelInterceptor implements HttpInterceptor {
	constructor() { /** */ }

	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		req = req.clone({ responseType: 'json' });
		return next.handle(req).pipe(map(event => {
			if (event instanceof HttpResponse) {
				// const parser = new DOMParser();
				// const xml = parser.parseFromString(event.body, 'text/xml');
				event = event.clone({ body: keysToCamel(event.body) });
			}

			return event;
		}));
	}
}