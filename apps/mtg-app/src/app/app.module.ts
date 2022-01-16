import { ViewsModule } from './views/views.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { environment } from '../environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import {
	HttpMethod,
	NG_ENTITY_SERVICE_CONFIG,
	NgEntityServiceGlobalConfig
 } from '@datorama/akita-ng-entity-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/auth/token.interceptor';
import { SnakeToCamelInterceptor } from './services/scryfall-search/snake-to-camel.interceptor';

@NgModule({
	declarations: [AppComponent, NxWelcomeComponent],
	imports: [
		BrowserAnimationsModule,
		SharedModule,
		AppRoutingModule,
		ViewsModule,
		environment.production ? [] : AkitaNgDevtools.forRoot()
	],
	providers: [
		{ provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: environment.baseUrl } },
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: SnakeToCamelInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
