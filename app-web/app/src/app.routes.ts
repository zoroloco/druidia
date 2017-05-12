/*
 * This class will define the routes used in the application. Imported in app.module.ts.
 */

import { Routes } from '@angular/router';

import { LoginComponent }        from './login.component';
import { HomeComponent }         from './home.component';
import { BlogComponent }         from './blog.component';
import { ChatterComponent }      from './chatter.component';
import { PageNotFoundComponent } from './common/page-not-found.component';

import { Auth }                  from './services/auth.service';
import { AuthGuard }             from './services/auth-guard.service';

export const ROUTES: Routes = [
  { path: 'home/blog'    , component: BlogComponent, canActivate: [AuthGuard] },
  { path: 'home/chatter' , component: ChatterComponent , canActivate: [AuthGuard]},
  { path: 'home'         , component: HomeComponent, canActivate: [AuthGuard]},
  { path: ''             , component: LoginComponent },
  { path: '**'           , component: PageNotFoundComponent }
];

export const routedComponents = [LoginComponent,BlogComponent,ChatterComponent,HomeComponent,PageNotFoundComponent];
