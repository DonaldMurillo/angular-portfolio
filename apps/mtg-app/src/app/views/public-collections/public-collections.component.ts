import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { environment } from '../../../../../../apps/mtg-app/src/environments/environment';
import { RouterHelperService } from '../../services/helpers/router-helper.service';
import { Collection, CollectionItem } from '../../services/user/collections/collection.model';

@Component({
	selector: 'ap-public-collections',
	templateUrl: './public-collections.component.html',
	styleUrls: ['./public-collections.component.scss']
})
export class PublicCollectionsComponent {

	nickname: string | undefined;
	collectionName: string | undefined;
	collection: Collection | undefined;
	paginatedItems = new Map<number, CollectionItem[]>();
	currentPageItems!: { page: number, items: CollectionItem[] | undefined};
	maxPages!: number;
	constructor(private http: HttpClient, private routerHelperService: RouterHelperService) {
		this.nickname = this.routerHelperService.getRouteParam('userNickname');
		this.collectionName = this.routerHelperService.getRouteParam('collectionName');
		const url = encodeURI(`${environment.baseUrl}/collections/${this.nickname}/${this.collectionName}`)
		this.http.get<Collection>(url)
			.pipe(first())
			.subscribe({
				next: collection => {
					this.collection = collection;
					this.maxPages = Math.ceil(this.collection.items.length/9)
					collection.items.forEach((item, index) => {
						this.paginatedItems.set(
							Math.ceil((index + 1)/9), 
							this.paginatedItems.get(Math.ceil((index + 1)/9))?.concat(item) ?? [item]
						)
					});
					this.currentPageItems = { page: 1, items: this.paginatedItems.get(1)};
				},
				error: err => console.log(err)
			})

	}

	prev() {
		if (this.currentPageItems.page === 1) return;
		const prevPage = this.currentPageItems.page -1;
		this.currentPageItems = {
			page: prevPage,
			items: this.paginatedItems.get(prevPage)
		};
	}

	next() {
		if (this.currentPageItems.page === this.maxPages) return;
		const nextPage = this.currentPageItems.page +1;
		this.currentPageItems = {
			page: nextPage,
			items: this.paginatedItems.get(nextPage)
		};
	}
}
