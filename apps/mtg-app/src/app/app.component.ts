import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular-portfolio/api-interfaces';
import { Observable } from 'rxjs';

@Component({
	selector: 'angular-portfolio-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	hello$!: Observable<Message>;
	theme: 'light' | 'dark' = 'dark';
	constructor(private http: HttpClient) { }

	toggleTheme() {
		this.theme = this.theme === 'dark' ? 'light' : 'dark';
		const styles = document?.getElementById('darkTheme') as HTMLLinkElement;
		styles.href = `assets/styles/lara-${this.theme}-purple/theme.css`
	}
}
