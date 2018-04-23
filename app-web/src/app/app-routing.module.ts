import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent }   from '../containers';

export const appRoutes : Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    //Now that the redirect above is done, it will fall in to the default path below
    {
      path: '',
      component: AppLayoutComponent,
      data: {
        title: 'druidia.net'
    },
    children: [
          {
              path: 'home',
              loadChildren: '../views/home/home.module#HomeModule'
          }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
