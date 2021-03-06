import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthQuery } from './auth.query';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
	constructor(private auth: AuthQuery) { 	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		// All HTTP requests are going to go through this method
		// We retrieve the token, if any
		const token = this.auth.getValue().accessToken;
		let newHeaders = req.headers;
		if (token) {
		   // If we have a token, we append it to our new headers
		   newHeaders = newHeaders.append('Authorization','Bearer ' + token);
		}
		// Finally we have to clone our request with our new headers
		// This is required because HttpRequests are immutable
		const authReq = req.clone({headers: newHeaders});
		// Then we return an Observable that will run the request
		// or pass it to the next interceptor if any
		return next.handle(authReq);
	}
}