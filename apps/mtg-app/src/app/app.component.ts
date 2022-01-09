import { AppQuery } from './services/app/app.query';
import { Component } from '@angular/core';
import { AuthQuery } from './services/auth/auth.query';

@Component({
	selector: 'ap-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	constructor(private query: AppQuery, private authQuery: AuthQuery) {}
}
