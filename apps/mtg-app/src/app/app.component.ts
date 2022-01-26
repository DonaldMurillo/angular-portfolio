import { Component, OnInit } from '@angular/core';
import { AuthQuery } from './services/auth/auth.query';
import { AuthService } from './services/auth/auth.service';

@Component({
	selector: 'ap-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private authQuery: AuthQuery, private authService: AuthService) {
	}

	ngOnInit(): void {
		if (this.authQuery.getValue().exp <= Date.now()/1000) {
			localStorage.clear();
		}
	}


}
