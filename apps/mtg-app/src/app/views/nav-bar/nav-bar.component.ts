import { AppQuery } from './../../services/app/app.query';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'ap-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

	items$!: Observable<MenuItem[]>;

	constructor(private query: AppQuery) { }

	ngOnInit(): void {
		this.items$ = this.query.selectMenuItems();
	}

}
