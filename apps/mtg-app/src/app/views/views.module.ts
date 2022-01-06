import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';

const COMPONENTS = [
	NavBarComponent, 
	FooterComponent, 
	SearchComponent,
]

@NgModule({
	declarations: [COMPONENTS, UserComponent],
	imports: [
		SharedModule
	],
	exports: [COMPONENTS]
})
export class ViewsModule { }
