import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppLayoutComponent} from '../../components/app-layout';
import {HumidiTempService, MusicPlayerService, UserService} from '../../services';
import {MovieComponent} from '../movies/movie.component';
import {HumiditempComponent} from '../humiditemp/humiditemp.component';
import {MusicPlayerComponent} from '../musicplayer/musicplayer.component';
import {RaspibotComponent} from '../raspibot/raspibot.component';
import {BabynamerComponent} from '../babynamer/babynamer.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        component: AppLayoutComponent,
        resolve: {
          user: UserService
        },
        children: [
          {
            path: 'movies',
            component: MovieComponent,
            data: {
              title: 'movies'
            }
          },
          {
            path: 'humiditemp',
            component: HumiditempComponent,
            data: {
              title: 'humiditemp'
            }
          },
          {
            path: 'mplayer',
            component: MusicPlayerComponent,
            data:{
              title: 'Music Player'
            }
          },
          {
            path: 'raspibot',
            component: RaspibotComponent,
            data:{
              title: 'RaspiBot'
            }
          },
          {
            path: 'babynamer',
            component: BabynamerComponent,
            data:{
              title: 'Baby Namer'
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserService]
})
export class HomeRoutingModule {}
