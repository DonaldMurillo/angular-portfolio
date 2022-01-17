import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { ScryfallCard } from '../../scryfall-search/scyfall-search.models';
import { CreateItemDto } from './collection.model';
import { CollectionsStore, CollectionsState } from './collections.store';

@Injectable({ providedIn: 'root' })
export class CollectionsService extends NgEntityService<CollectionsState> {

	constructor(protected override store: CollectionsStore) {
		super(store);
	}

	reset() {
		this.store.reset();
	}

	addCardToCollection(card: ScryfallCard, id: string) {
		const createItemDto: CreateItemDto = {
			colors: card.colors ?? [],
			name: card.name,
			foil: card.foil,
			lang: card.lang,
			quantity: 1,
			scryfallId: card.id,
			scryfallUri: card.scryfallUri,
			imageUriNormal: card.imageUris?.normal
		}
		this.getHttp().post(`${this.baseUrl}/${id}/item`, createItemDto)
			.subscribe(item => item)
	}
}
