import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { createInitialState, ScryfallSearchState } from './scyfall-search.models';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'scryfall-search', resettable: true })
export class ScryfallSearchStore extends Store<ScryfallSearchState> {

	constructor() {
		super(createInitialState());
	}

}
