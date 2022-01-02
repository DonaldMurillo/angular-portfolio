import { ViewsModule } from './views/views.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { environment } from '../environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
	  BrowserAnimationsModule, 
	  SharedModule, 
	  AppRoutingModule, 
	  ViewsModule,
	  environment.production ? [] : AkitaNgDevtools.forRoot()
	],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
