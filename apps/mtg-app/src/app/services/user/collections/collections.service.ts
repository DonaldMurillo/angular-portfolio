import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';
import { createSuccessMessage } from '../../../shared/utils/message.helpers';
import { AuthQuery } from '../../auth/auth.query';
import { ScryfallCard } from '../../scryfall-search/scyfall-search.models';
import { CollectionItem, CreateItemDto } from './collection.model';
import { CollectionsStore, CollectionsState } from './collections.store';

@Injectable({ providedIn: 'root' })
export class CollectionsService extends NgEntityService<CollectionsState> {

	constructor(protected override store: CollectionsStore, public messagingService: MessageService, private authQuery: AuthQuery) {
		super(store);
		if (!this.authQuery.getValue().accessToken) return;
		this.get().pipe(first()).subscribe();
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

	updateCardCount(quantity: number, cardId: string, collectionId: string) {

		if (quantity === 0) this.removeCardFromCollection(cardId, collectionId);
		else this.getHttp().patch<CollectionItem>(`${this.baseUrl}/collections/${collectionId}/item/${cardId}`, { quantity })
				.pipe(first())
				.subscribe({
					next: item => {
						this.store.update(collectionId, entity => ({...entity, items: entity.items.map(i => i.id === item.id ? ({...i, quantity: item.quantity}) : i)}));
						this.messagingService.add(createSuccessMessage('Item added to Collection'));
					}
				})
	}

	removeCardFromCollection(cardId: string, collectionId: string) {
		this.getHttp().delete(`${this.baseUrl}/collections/${collectionId}/item/${cardId}`)
			.pipe(first())
			.subscribe({
				next: () => {
					this.store.update(collectionId, entity => ({...entity, items: entity.items.filter(item => item.id !== cardId)}));
					this.messagingService.add(createSuccessMessage('Item removed from Collection'));
				}
			})
	}
}
