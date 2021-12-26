import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PRIME_MODULES } from './primeng';
import { FlexLayoutModule } from '@angular/flex-layout';


const MODULES = [
	PRIME_MODULES,
	HttpClientModule,
	CommonModule,
	FlexLayoutModule,
	ReactiveFormsModule,
	FormsModule,
];

@NgModule({
	declarations: [],
	imports: [
		MODULES,
	],
	exports: [
		MODULES
	]
})
export class SharedModule { }
