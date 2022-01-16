import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { CollectionsStore, CollectionsState } from './collections.store';

@Injectable({ providedIn: 'root' })
export class CollectionsService extends NgEntityService<CollectionsState> {

	constructor(protected override store: CollectionsStore) {
		super(store);
	}
}
