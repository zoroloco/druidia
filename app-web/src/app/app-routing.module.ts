import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import {AuthGuard} from './auth/auth-guard';
import { LoginComponent } from 'src/views/login/login.component';
import { HomeComponent } from './home.component';
import {P404Component} from '../components';

export const appRoutes: Routes = [
  // Lets make the app navigate to the workflow automatically
  {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
  },
  // Now that the redirect above is done, it will fall in to the default path below
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent, // dummy component
    loadChildren: '../views/home/home.module#HomeModule'
  },
  { path: 'authenticated', component: AuthComponent }, // just used to extract/store the JWT and redirect to home.
  { path: '**'           , component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
