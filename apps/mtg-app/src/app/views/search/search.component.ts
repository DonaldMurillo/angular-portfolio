import { CollectionsQuery } from './../../services/user/collections/collections.query';
import { Collection } from './../../services/user/collections/collection.model';
import { ScryfallSearchService } from './../../services/scryfall-search/scryfall-search.service';
import { ScryfallSearchQuery } from './../../services/scryfall-search/scryfall-search.query';
import { first, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScryfallCard } from '../../services/scryfall-search/scyfall-search.models';
import { UserQuery } from '../../services/user/user.query';
import { CollectionsService } from '../../services/user/collections/collections.service';

@Component({
	selector: 'ap-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

	private destroy$ = new Subject();

	searchTerm = '';
	displaySize = 'medium';
	hasSearched = false;
	totalPages = 0;
	selected: ScryfallCard | null = null;
	displayDialog = false;
	userCollections: Collection[] = [];
	isLogged = false;
	selectedCollection!: Collection;

	isLoading$!: Observable<boolean>;
	results$!: Observable<ScryfallCard[]>;
	totalResults$!: Observable<number | undefined>;
	currentPage$!: Observable<number | undefined>;

	constructor(
		private query: ScryfallSearchQuery,
		private service: ScryfallSearchService,
		private userQuery: UserQuery,
		private collectionQuery: CollectionsQuery,
		private collectionService: CollectionsService) { }

	ngOnInit() {
		this.isLoading$ = this.query.select('isLoading');
		this.results$ = this.query.select('searchResult');
		this.totalResults$ = this.query.select('totalResults').pipe(map(t => {
			const total = Math.ceil((t ?? 0) / 175);
			this.totalPages = total;
			return total;
		}));
		this.currentPage$ = this.query.select('currentPage');
		this.userQuery.select('id');
		this.collectionQuery.selectAll()
			.pipe(takeUntil(this.destroy$))
			.subscribe(cols => {
				this.userCollections = cols;
			});
		this.userQuery.select('id')
			.pipe(map(id => Boolean(id)), takeUntil(this.destroy$))
			.subscribe(isLogged => {
				this.isLogged = isLogged;
				if (!isLogged) return;
				this.collectionService.get().pipe(first()).subscribe();
			})

	}

	search() {
		if (this.searchTerm.length <= 2) return;
		this.hasSearched = true;
		this.service.searchCards(this.searchTerm);
	}

	getPage(page: number) {
		if (page === 0 || page > this.totalPages) return;
		this.service.getPage(page);
	}

	addToCollection() {
		this.displayDialog = false;
		if (!this.selected || !this.selectedCollection.id) return;
		this.collectionService.addCardToCollection(this.selected, this.selectedCollection.id);
	}

	openDialog() {
		this.displayDialog = true;
	}

	ngOnDestroy(): void {
		this.destroy$.next(null);
		this.destroy$.complete();
	}
}
