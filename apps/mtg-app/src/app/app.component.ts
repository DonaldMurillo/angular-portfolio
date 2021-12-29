import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular-portfolio/api-interfaces';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'ap-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	hello$!: Observable<Message>;
	
}
