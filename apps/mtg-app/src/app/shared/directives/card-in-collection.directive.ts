import { ChangeDetectorRef, ComponentRef, Directive, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ScryfallCard } from '../../services/scryfall-search/scyfall-search.models';
import { CollectionsQuery } from '../../services/user/collections/collections.query';
import { CollectionIconComponent } from '../components/collection-icon/collection-icon.component';

@Directive({
	selector: '[apCardInCollection]'
})
export class CardInCollectionDirective implements OnInit, OnDestroy {

	// DIRECTIVE USED IN AN onPush CHANGE DETECTION STRATEGY COMPONENT
	@Input() apCardInCollection!: ScryfallCard;

	private destroy$ = new Subject();
	private currentIcons: ComponentRef<CollectionIconComponent>[] = [];
	constructor(private collectionQuery: CollectionsQuery, private viewRef: ViewContainerRef, private cdr: ChangeDetectorRef) { }

	ngOnInit(): void {
		this.collectionQuery.selectAll()
			.pipe(takeUntil(this.destroy$))
			.subscribe(
				collections => {
					const foundCollections = collections?.filter(col => col.items?.some(item => item.scryfallId === this.apCardInCollection.id));
					
					if (!foundCollections.length) return;

					this.currentIcons.forEach(icon => icon.destroy())
					this.currentIcons = [];

					for (const col of foundCollections) {
						const colIcon = this.viewRef.createComponent<CollectionIconComponent>(CollectionIconComponent);
						colIcon.instance.collection = col;
						this.currentIcons.push(colIcon);
					}
					this.cdr.detectChanges();
				}
			)
	}

	ngOnDestroy(): void {
		this.destroy$.next(null);
		this.destroy$.complete();
	}
}
