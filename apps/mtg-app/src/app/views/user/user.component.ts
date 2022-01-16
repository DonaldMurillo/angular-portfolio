import { map } from 'rxjs/operators';
import { RouterHelperService } from './../../services/helpers/router-helper.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
	selector: 'ap-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

	items: MenuItem[] = [
		{ label: 'Account', icon: 'pi pi-fw pi-cog', routerLink: ['./'] },
		{ label: 'Collections', icon: 'pi pi-fw pi-box', routerLink: ['collections'] },
	];;

	activeItem$!: Observable<MenuItem | undefined>;

	constructor(private routerHelper: RouterHelperService) {}

	ngOnInit() {

		this.activeItem$ = this.routerHelper
			.selectCurrentRoute()
			.pipe(map(url => {
				if (!url) return undefined;
				else if (url?.includes('collection')) return this.items[1];
				else return this.items[0];
			}));
	}
}
