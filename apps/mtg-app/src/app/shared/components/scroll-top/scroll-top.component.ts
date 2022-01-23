import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';

@Component({
	selector: 'ap-scroll-top',
	templateUrl: './scroll-top.component.html',
	styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent implements OnDestroy, AfterViewInit {

	show = false;
	constructor(private elementRef: ElementRef) {}

	ngAfterViewInit(): void {
		this.elementRef.nativeElement.previousElementSibling?.addEventListener('scroll', this.calculatePosition.bind(this));
	}

	scrollTop() {
		this.elementRef.nativeElement.previousElementSibling.scrollTop = 0;
	}

	calculatePosition(e: Event) {
		const top = (e.target as Element).scrollTop;
		if (top > 180) this.show = true;
		else this.show = false
	}

	ngOnDestroy(): void {
		this.elementRef.nativeElement.previousElementSibling?.removeEventListener('scroll', this.calculatePosition.bind(this));
	}
}
