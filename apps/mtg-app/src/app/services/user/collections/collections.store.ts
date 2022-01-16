import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Collection } from './collection.model';

export type CollectionsState = EntityState<Collection>

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'collections' })
export class CollectionsStore extends EntityStore<CollectionsState> {

	constructor() {
		super();
	}

}
