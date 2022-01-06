import { AppTheme } from './../../services/app/app.model';
import { AppQuery } from './../../services/app/app.query';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { AppService } from '../../services/app/app.service';

@Component({
  selector: 'ap-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

	items$!: Observable<MenuItem[]>;
	theme$!: Observable<AppTheme>;

	constructor(private query: AppQuery, private service: AppService) { }

	ngOnInit(): void {
		this.items$ = this.query.selectMenuItems();
		this.theme$ = this.query.select('theme');
	}

	toggleTheme() {
		this.service.toggleTheme();
	}
}
