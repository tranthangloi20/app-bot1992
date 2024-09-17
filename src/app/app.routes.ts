import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, SignalComponent } from './pages/index';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'signal', component: SignalComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' } // Redirect default path to home
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }