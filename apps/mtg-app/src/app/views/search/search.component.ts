import { ScryfallSearchService } from './../../services/scryfall-search/scryfall-search.service';
import { ScryfallSearchQuery } from './../../services/scryfall-search/scryfall-search.query';
import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ScryfallCard } from '../../services/scryfall-search/scyfall-search.models';

@Component({
	selector: 'ap-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	searchTerm = '';
	displaySize = 'medium';
	hasSearched = false;
	totalPages = 0;
	selected: ScryfallCard | null = null;

	isLoading$!: Observable<boolean>;
	results$!: Observable<ScryfallCard[]>;
	totalResults$!: Observable<number | undefined>;
	currentPage$!: Observable<number | undefined>;

	constructor(private query: ScryfallSearchQuery, private service: ScryfallSearchService) { }

	ngOnInit() {
		this.isLoading$ = this.query.select('isLoading');
		this.results$ = this.query.select('searchResult');
		this.totalResults$ = this.query.select('totalResults').pipe(map(t => {
			const total = Math.ceil((t ?? 0)/175);
			this.totalPages = total;
			return total;
		}));
		this.currentPage$ = this.query.select('currentPage');
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
}
