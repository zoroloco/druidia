import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent }   from '../components';
import { LoginComponent} from "../views/login/login.component";
import { RegisterComponent} from "../views/login/register.component";
import { AuthComponent } from "./auth/auth.component";
import {AuthGuard} from './auth/auth-guard';
import {P404Component} from '../components';
import {HomeComponent} from "./home.component";

// This Route array will be exported out to the main app module to define the routing of this application.
// This is the top-level routing of this app.
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
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent, //dummy component
    canActivate: [
      AuthGuard
    ],
    loadChildren: '../views/home/home.module#HomeModule'
  },
  { path: 'authenticated', component: AuthComponent }, //just used to extract/store the JWT and redirect to home.
  { path: '**'           , component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
