import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { MessageService } from 'primeng/api';
import { first, pipe } from 'rxjs';
import { createSuccessMessage } from '../../../shared/utils/message.helpers';
import { ScryfallCard } from '../../scryfall-search/scyfall-search.models';
import { CollectionItem, CreateItemDto } from './collection.model';
import { CollectionsStore, CollectionsState } from './collections.store';

@Injectable({ providedIn: 'root' })
export class CollectionsService extends NgEntityService<CollectionsState> {

	constructor(protected override store: CollectionsStore, public messagingService: MessageService) {
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
		this.getHttp().post<CollectionItem>(`${this.baseUrl}/collections/${id}/item`, createItemDto)
			.pipe(first())
			.subscribe({
				next: item => {
					this.store.update(id, entity => ({...entity, items: entity.items.concat(item)}));
					this.messagingService.add(createSuccessMessage('Item added to Collection'));
				}
			})
	}
}
