import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ScryfallSearchStore } from './scryfall-search.store';

@Injectable({ providedIn: 'root' })
export class ScryfallSearchService {

  constructor(private scryfallSearchStore: ScryfallSearchStore, private http: HttpClient) {
  }


}
