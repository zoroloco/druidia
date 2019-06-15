import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule} from '../../app/material.module';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRobot, faPlay, faStop, faRandom, faForward, faBackward, faSync } from '@fortawesome/free-solid-svg-icons';

import {JwtInterceptor} from '../../app/auth/auth.jwt.interceptor';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TimepickerModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';

// Directives
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

// Components
import {MovieComponent} from '../movies/movie.component';
import {HumiditempComponent} from '../humiditemp/humiditemp.component';
import {MusicPlayerComponent} from '../musicplayer/musicplayer.component';
import {RaspibotComponent} from '../raspibot/raspibot.component';
import {BabynamerComponent} from '../babynamer/babynamer.component';

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
  HumiditempComponent,
  MusicPlayerComponent,
  RaspibotComponent,
  BabynamerComponent];

// services
import { UserService,
  MovieService,
  HumidiTempService,
  MusicPlayerService,
  RaspyService} from '../../services/';

const HOME_SERVICES = [UserService, MovieService, HumidiTempService,MusicPlayerService,RaspyService];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    MaterialModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    FontAwesomeModule
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
export class HomeModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faRobot, faPlay, faStop, faRandom, faForward, faBackward, faSync);
  }
}
