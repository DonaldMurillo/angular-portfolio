import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CollectionsStore, CollectionsState } from './collections.store';

@Injectable({ providedIn: 'root' })
export class CollectionsQuery extends QueryEntity<CollectionsState> {

	constructor(protected override store: CollectionsStore) {
		super(store);
	}

}
