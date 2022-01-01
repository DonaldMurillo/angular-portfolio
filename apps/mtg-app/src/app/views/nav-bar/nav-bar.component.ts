import { AuthQuery } from './../../services/auth/auth.query';
import { AppTheme } from './../../services/app/app.model';
import { AppQuery } from './../../services/app/app.query';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppService } from '../../services/app/app.service';

@Component({
  selector: 'ap-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

	private destroy$ = new Subject();
	items$!: Observable<MenuItem[]>;
	theme$!: Observable<AppTheme>;
	userId: string | undefined;

	constructor(private query: AppQuery, private service: AppService, private authQuery: AuthQuery) { }
	
	ngOnInit(): void {
		this.items$ = this.query.selectMenuItems();
		this.theme$ = this.query.select('theme');
		this.authQuery.select('userId').pipe(takeUntil(this.destroy$)).subscribe(id => this.userId = id);
	}
	
	toggleTheme() {
		this.service.toggleTheme();
	}

	ngOnDestroy(): void {
		this.destroy$.next(null);
		this.destroy$.complete();
	}
}
