import { UserComponent } from './views/user/user.component';
import { SearchComponent } from './views/search/search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//https://angular.io/guide/lazy-loading-ngmodules
//ng generate module customers --route customers --module app.module
const routes: Routes = [

	{ path: '', redirectTo: 'search', pathMatch: 'full' },
	{ path: 'search', component: SearchComponent, pathMatch: 'full' },
	{ path: 'user', component: UserComponent, pathMatch: 'full' },

	{ path: '**', redirectTo: 'search', pathMatch: 'full' }, // TODO: MAKE 404 PAGE;
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule],
})
export class AppRoutingModule { }
