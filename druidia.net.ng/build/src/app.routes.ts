/*
 * This class will define the routes used in the application. Imported in app.module.ts.
 */

import { Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
//import { CallbackComponent } from './callback/callback.component';

export const ROUTES: Routes = [  
  { path: 'login', component: LoginComponent },
  { path: 'home/:access_token:expires_in:token_type:id_token' , component: HomeComponent },
  { path: '**', redirectTo: '' }
];