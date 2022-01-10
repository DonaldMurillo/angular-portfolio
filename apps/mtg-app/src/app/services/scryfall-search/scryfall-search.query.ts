import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ScryfallSearchStore } from './scryfall-search.store';
import { ScryfallSearchState } from './scyfall-search.models';

@Injectable({ providedIn: 'root' })
export class ScryfallSearchQuery extends Query<ScryfallSearchState> {

  constructor(protected override store: ScryfallSearchStore) {
    super(store);
  }

}
