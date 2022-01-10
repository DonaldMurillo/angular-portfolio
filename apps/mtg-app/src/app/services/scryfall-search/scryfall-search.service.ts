import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScryfallSearchStore } from './scryfall-search.store';
import { ScryfallSearchResponse } from './scyfall-search.models';

@Injectable({ providedIn: 'root' })
export class ScryfallSearchService {

	private baseUrl = 'https://api.scryfall.com/cards/';

	constructor(private scryfallSearchStore: ScryfallSearchStore, private http: HttpClient, private messageService: MessageService) {
	}

	searchCards(searchTerm: string) {
		this.scryfallSearchStore.update(state => ({ ...state, isLoading: true}));
		this.http.get<ScryfallSearchResponse>(this.getSearchUrl(searchTerm))
			.pipe(first())
			.subscribe({
				next: (response: ScryfallSearchResponse) => {
					this.scryfallSearchStore.update(state => ({
						isLoading: false,
						searchTerm: searchTerm,
						searchResult: response.data,
						nextPage: response.hasMore ? response.nextPage : null,
						totalResults: response.totalCards,
						currentPage: 1
					}));
				},
				error: (error: HttpErrorResponse) => {
					this.messageService.add({ key: 'tc', severity: 'error', summary: 'error', detail: error.error.message, });
					this.scryfallSearchStore.update(state => ({ ...state, isLoading: false }));
				},
				complete: () => this.scryfallSearchStore.update(state => ({ ...state, isLoading: false }))
			})
	}

	getPage(page: number) {
		const searchTerm = this.scryfallSearchStore.getValue().searchTerm;
		this.scryfallSearchStore.update(state => ({ ...state, isLoading: true}));
		this.http.get<ScryfallSearchResponse>(this.getSearchUrl(searchTerm, page))
			.pipe(first())
			.subscribe({
				next: (response: ScryfallSearchResponse) => {
					this.scryfallSearchStore.update(state => ({
						...state,
						isLoading: false,
						searchResult: response.data,
						nextPage: response.hasMore ? response.nextPage : null,
						currentPage: page
					}));
				},
				error: (error: HttpErrorResponse) => {
					this.messageService.add({ key: 'tc', severity: 'error', summary: 'error', detail: error.error.message, });
					this.scryfallSearchStore.update(state => ({ ...state, isLoading: false }));
				},
				complete: () => this.scryfallSearchStore.update(state => ({ ...state, isLoading: false }))
			})
		//
	}

	private getSearchUrl(searchTerm: string, page: number = 1) {
		return encodeURI(`https://api.scryfall.com/cards/search?format=json&include_extras=false&include_multilingual=false&order=name&page=${page}&q=${searchTerm}&unique=cards`);
	}
}
