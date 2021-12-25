import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular-portfolio/api-interfaces';

@Component({
	selector: 'angular-portfolio-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	hello$ = this.http.get<Message>('/api/hello');
	theme: 'light' | 'dark' = 'dark';
	constructor(private http: HttpClient) { }

	toggleTheme() {
		this.theme = this.theme === 'dark' ? 'light' : 'dark';
		const styles = document?.getElementById('darkTheme') as any ;
		styles.href = `assets/styles/lara-${this.theme}-purple/theme.css`
	}
}
