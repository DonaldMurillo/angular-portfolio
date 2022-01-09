import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScryfallSearchStore } from './scryfall-search.store';
import { ScryfallSearchResponse } from './scyfall-search.models';

@Injectable({ providedIn: 'root' })
export class ScryfallSearchService {

	baseUrl = 'https://api.scryfall.com/cards/';

	constructor(private scryfallSearchStore: ScryfallSearchStore, private http: HttpClient, private messageService: MessageService) {
	}

	searchCards(searchTerm: string) {
		this.scryfallSearchStore.update(state => ({ ...state, isLoading: true}));
		this.http.get<ScryfallSearchResponse>(encodeURI(this.baseUrl + 'search?q=' + searchTerm))
			.pipe(first())
			.subscribe({
				next: (response: ScryfallSearchResponse) => {
					this.scryfallSearchStore.update(state => ({
						isLoading: false,
						searchTerm: searchTerm,
						searchResult: response.data,
						nextPage: response.hasMore ? response.nextPage : null,
						totalResults: response.totalCards
					}));
				},
				error: (error: HttpErrorResponse) => {
					this.messageService.add({ key: 'tc', severity: 'error', summary: 'error', detail: error.error.message, });
					this.scryfallSearchStore.update(state => ({ ...state, isLoading: false }));
				},
				complete: () => this.scryfallSearchStore.update(state => ({ ...state, isLoading: false }))
			})
	}

}
