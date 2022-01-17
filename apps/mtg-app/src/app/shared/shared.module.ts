import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PRIME_MODULES } from './primeng';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MessageService } from 'primeng/api';
import { YesNoPipe } from './pipes/yes-no.pipe';
import {ConfirmationService} from 'primeng/api';
import { CardInCollectionDirective } from './directives/card-in-collection.directive';
import { CollectionIconComponent } from './components/collection-icon/collection-icon.component';

const MODULES = [
	PRIME_MODULES,
	HttpClientModule,
	CommonModule,
	FlexLayoutModule,
	ReactiveFormsModule,
	FormsModule,
];

@NgModule({
	declarations: [YesNoPipe, CardInCollectionDirective, CollectionIconComponent],
	imports: [
		MODULES,
	],
	exports: [
		MODULES,
		YesNoPipe,
		CardInCollectionDirective
	],
	providers: [MessageService, ConfirmationService]
})
export class SharedModule { }
