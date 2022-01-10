import { ScryfallCard } from './../../../services/scryfall-search/scyfall-search.models';
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'ap-card-preview',
	templateUrl: './card-preview.component.html',
	styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent {
	
	_isSelected!: boolean;

	@Input() card!: ScryfallCard;
	@Input() set isSelected(isSelected: boolean) {
		const wasSelected = this._isSelected && !isSelected;
		this._isSelected = isSelected;
		if (this._isSelected) {
			// REQUIRED WHEN SELECTING ANOTHER CARD W/O CLOSING THE PREVIOUS
			setTimeout(() =>this.elementRef.nativeElement?.previousElementSibling?.scrollIntoView(), 25);
		}
		else if(wasSelected) {
			// REQUIRED TO GIVE THE TEMPLATE TIME TO RENDER BEFORE SCROLLING BACK TO IT
			setTimeout(() =>this.elementRef.nativeElement?.previousElementSibling?.scrollIntoView(), 20);
		}
	};
	@Output() imageClick = new EventEmitter();
	@Output() unSelect = new EventEmitter();

	constructor(private elementRef: ElementRef) { }

	clicked() {
		this.imageClick.emit();
	}

	close() {
		this.unSelect.emit();
	}
}
