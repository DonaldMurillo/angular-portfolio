import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { UserCollectionsComponent } from './user/user-collections/user-collections.component';
import { UserAccountComponent } from './user/user-account/user-account.component';
import { UserCreateProfileComponent } from './user/user-create-profile/user-create-profile.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserSignupComponent } from './user/user-signup/user-signup.component';
import { CardPreviewComponent } from './search/card-preview/card-preview.component';

const COMPONENTS = [
	NavBarComponent, 
	FooterComponent, 
	SearchComponent,
]

@NgModule({
	declarations: [COMPONENTS, UserComponent, UserCollectionsComponent, UserAccountComponent, UserCreateProfileComponent, UserLoginComponent, UserSignupComponent, CardPreviewComponent],
	imports: [
		SharedModule
	],
	exports: [COMPONENTS]
})
export class ViewsModule { }
