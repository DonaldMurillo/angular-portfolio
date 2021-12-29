import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';

const COMPONENTS = [
	NavBarComponent, FooterComponent
]

@NgModule({
  declarations: [ COMPONENTS ],
  imports: [
    SharedModule
  ],
  exports: [COMPONENTS]
})
export class ViewsModule { }
