import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//https://angular.io/guide/lazy-loading-ngmodules
//ng generate module customers --route customers --module app.module
const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }, // TODO: MAKE 404 PAGE;
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
