import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CollectionsService } from './../../../services/user/collections/collections.service';

import { Component, OnInit } from '@angular/core';
import { CollectionsQuery } from '../../../services/user/collections/collections.query';
import { UserQuery } from '../../../services/user/user.query';
import { Collection } from '../../../services/user/collections/collection.model';
import { ConfirmationService } from 'primeng/api';
import { createErrorMessage, createSuccessMessage } from '../../../shared/utils/message.helpers';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../../../../apps/mtg-app/src/environments/environment';

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
				next: () => {
					this.service.messagingService.add(createSuccessMessage('Collection Succesfully Created'));
					this.form.reset({ tradeable: false });
				},
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
				this.service.delete(id).subscribe(
					{
						next: () => this.service.messagingService.add(createSuccessMessage('Collection Succesfully Removed')),
						error: (error: HttpErrorResponse) => this.service.messagingService.add(createErrorMessage(error))
					}
				);
			},
			reject: () => {
				//reject action
			}
		});
	}

	getCollectionLink(collection: Collection) {
		return encodeURI(`${environment.baseWebUrl}/collections/${this.userQuery.getValue().nickname}/${collection.name}`)
	}

	copyToClipboard = async (str: string) => {
		// IF THE DEVICE HAS NATIVE SHARING CAPABILITIES THEN USE IT
		if (navigator.share) {
			try {
				await navigator.share({
					title: 'Share collection',
					url: str
				});
			} catch (message) {
				return console.error(message);
			}
		}
		// ELSE COPY TO CLIPBOARD
		else if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
			this.service.messagingService.add(createSuccessMessage('Link copied to clipboard!'));
			return navigator.clipboard.writeText(str);
		}
		else {
			// shareDialog.classList.add('is-open');
			return Promise.reject('The Clipboard API is not available.');
		}

	};
}
