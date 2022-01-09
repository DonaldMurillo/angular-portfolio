import { UserSignupComponent } from './views/user/user-signup/user-signup.component';
import { UserLoginComponent } from './views/user/user-login/user-login.component';
import { UserCreateProfileComponent } from './views/user/user-create-profile/user-create-profile.component';
import { UserAccountComponent } from './views/user/user-account/user-account.component';
import { UserCollectionsComponent } from './views/user/user-collections/user-collections.component';
import { SearchComponent } from './views/search/search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './services/user/user.guard';

//https://angular.io/guide/lazy-loading-ngmodules
//ng generate module customers --route customers --module app.module
const routes: Routes = [

	{ path: '', redirectTo: 'search', pathMatch: 'full' },
	{ path: 'search', component: SearchComponent, pathMatch: 'full' },
	{ path: 'user/login', component: UserLoginComponent, pathMatch: 'full' },
	{ path: 'user/signup', component: UserSignupComponent, pathMatch: 'full' },
	{ path: 'user/:userId/collections', component: UserCollectionsComponent, pathMatch: 'full', canActivate: [UserGuard]},
	{ path: 'user/:userId/my-account', component: UserAccountComponent, pathMatch: 'full', canActivate: [UserGuard] },
	{ path: 'user/:userId/create-profile', component: UserCreateProfileComponent, pathMatch: 'full', canActivate: [UserGuard] },

	{ path: '**', redirectTo: 'search', pathMatch: 'full' }, // TODO: MAKE 404 PAGE;
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule],
})
export class AppRoutingModule { }
