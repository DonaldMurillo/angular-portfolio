import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CollectionsService } from './../../../services/user/collections/collections.service';

import { Component, OnInit } from '@angular/core';
import { CollectionsQuery } from '../../../services/user/collections/collections.query';
import { UserQuery } from '../../../services/user/user.query';
import { Collection } from '../../../services/user/collections/collection.model';
import { RouterHelperService } from '../../../services/helpers/router-helper.service';
import { ConfirmationService } from 'primeng/api';
import { createErrorMessage, createSuccessMessage } from '../../../shared/utils/message.helpers';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'ap-user-collections',
	templateUrl: './user-collections.component.html',
	styleUrls: ['./user-collections.component.scss']
})
export class UserCollectionsComponent implements OnInit {

	form = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(4)]),
		tradeable: new FormControl(false, [Validators.required]),
	});

	tradeOptions = [{ label: 'Yes', value: true }, { label: 'No', value: false }];

	collections$!: Observable<Collection[]>;
	isLoading$!: Observable<boolean>;

	constructor(
		private query: CollectionsQuery, 
		private service: CollectionsService,
		private userQuery: UserQuery,
		private routerHelper: RouterHelperService,
		private confirmationService: ConfirmationService) { }

	ngOnInit() {
		this.isLoading$ = this.query.selectLoading();
		this.collections$ = this.query.selectAll();
		this.service.get().subscribe();
	}

	create() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;
		this.service.add<Collection>({ ...this.form.value, profileId: this.userQuery.getValue().id })
			.subscribe({
				next: (collection) => this.service.messagingService.add(createSuccessMessage('Collection Succesfully Created')),
				error: (error: HttpErrorResponse) => this.service.messagingService.add(createErrorMessage(error))
			});
	}

	remove(event: Event, id?: string) {
		if (!id) return; //TODO: SHOW ERROR?
		this.confirmationService.confirm({
			target: event.target ?? undefined,
			message: 'This action is irreversable. Are you sure that you want to proceed?',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				 //confirm action
				 this.service.delete(id).subscribe();
			},
			reject: () => {
				 //reject action
			}
	  });
	}

	update(id?: string) {
		if (!id) return; 
		return;
		this.routerHelper.router.navigate([id])
	}
}
