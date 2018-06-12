import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule} from "../../app/material.module";
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {JwtInterceptor} from "../../app/auth/auth.jwt.interceptor";

// Import 3rd party components
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TimepickerModule }   from 'ngx-bootstrap';
//import { BsDatepickerModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';

//Directives
import {
  ClickCounterDirective,
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from '../../directives';

const HOME_DIRECTIVES = [
  ClickCounterDirective,
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
];

//Components
import {MovieComponent} from "../movies/movie.component";
import {HumiditempComponent} from "../humiditemp/humiditemp.component";

import {
  AppLayoutComponent,
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV} from '../../components';

const HOME_COMPONENTS = [
  AppLayoutComponent,
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
  MovieComponent,
  HumiditempComponent];

//services
import { UserService,
  MovieService,
  HumidiTempService} from '../../services/';

const HOME_SERVICES = [UserService, MovieService, HumidiTempService];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    MaterialModule,
    HttpClientModule,
    ChartsModule,
    //BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [ HOME_COMPONENTS,
                  HOME_DIRECTIVES],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    } ,
    HOME_SERVICES
  ]
})
export class HomeModule { }
