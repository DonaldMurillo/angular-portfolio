import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpMethod } from '@datorama/akita-ng-entity-service';
import { debounceTime, first, Observable, tap } from 'rxjs';
import { RouterHelperService } from '../../../services/helpers/router-helper.service';
import { Collection, CollectionItem } from '../../../services/user/collections/collection.model';
import { CollectionsQuery } from '../../../services/user/collections/collections.query';
import { CollectionsService } from '../../../services/user/collections/collections.service';
import { createErrorMessage, createSuccessMessage } from '../../../shared/utils/message.helpers';

@Component({
	selector: 'ap-user-collections-update',
	templateUrl: './user-collections-update.component.html',
	styleUrls: ['./user-collections-update.component.scss']
})
export class UserCollectionsUpdateComponent implements OnInit {

	currentCollection$!: Observable<Collection | undefined>;
	isLoading$!: Observable<boolean>;

	form = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(4)]),
		tradeable: new FormControl(false, [Validators.required]),
	});

	tradeOptions = [{ label: 'Yes', value: true }, { label: 'No', value: false }];
	collectionId: string | undefined;

	constructor(
		private service: CollectionsService, 
		private query: CollectionsQuery, 
		private routerHelper: RouterHelperService,
		
		) { }

	ngOnInit() {
		this.collectionId = this.routerHelper.getRouteParam('collectionId');
		this.isLoading$ = this.query.selectLoading();
		if (!this.collectionId) return;
		this.currentCollection$ = this.query.selectEntity(this.collectionId)
			.pipe(tap(col => this.form.reset({ name: col?.name, tradeable: col?.tradeable })));
	}

	update() {
		this.form.markAllAsTouched();
		if (this.form.invalid || !this.form.dirty) return;
		// TODO: FIX
		this.service.update(this.collectionId, this.form.value as any, { method: HttpMethod.PATCH })
			.pipe(first(), debounceTime(3000))
			.subscribe({
				next: () => this.service.messagingService.add(createSuccessMessage('InformaitonUpdated')),
				error: (err) => this.service.messagingService.add(createErrorMessage(err))
			})
	}

	addOne(item: CollectionItem) {
		if (!this.collectionId) return;
		this.service.updateCardCount(item.quantity + 1, item.id, this.collectionId);
	}

	removeOne(item: CollectionItem) {
		if (!this.collectionId) return;
		this.service.updateCardCount(item.quantity - 1, item.id, this.collectionId);
	}

	removeItem(id: string) {
		if (!this.collectionId) return;
		this.service.removeCardFromCollection(id, this.collectionId)
	}
}
