import { ScryfallSearchService } from './../../services/scryfall-search/scryfall-search.service';
import { ScryfallSearchQuery } from './../../services/scryfall-search/scryfall-search.query';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
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
	selected: ScryfallCard | null = null;

	isLoading$!: Observable<boolean>;
	results$!: Observable<ScryfallCard[]>;

	constructor(private query: ScryfallSearchQuery, private service: ScryfallSearchService) { }

	ngOnInit() {
		this.isLoading$ = this.query.select('isLoading');
		this.results$ = this.query.select('searchResult');
	}

	search() {
		if (this.searchTerm.length <= 2) return;
		this.hasSearched = true;
		this.service.searchCards(this.searchTerm);
	}

	unSelect(el: any) {
		this.selected = null;
		// el.scrollIntoView();

	}
}
