import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PRIME_MODULES } from './primeng';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MessageService } from 'primeng/api';
import { YesNoPipe } from './pipes/yes-no.pipe';


const MODULES = [
	PRIME_MODULES,
	HttpClientModule,
	CommonModule,
	FlexLayoutModule,
	ReactiveFormsModule,
	FormsModule,
];

@NgModule({
	declarations: [YesNoPipe],
	imports: [
		MODULES,
	],
	exports: [
		MODULES,
		YesNoPipe
	],
	providers: [MessageService,]
})
export class SharedModule { }
