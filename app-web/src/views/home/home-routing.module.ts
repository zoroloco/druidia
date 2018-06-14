import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppLayoutComponent} from "../../components/app-layout";
import {HumidiTempService, UserService} from "../../services";
import {MovieComponent} from "../movies/movie.component";
import {HumiditempComponent} from "../humiditemp/humiditemp.component";

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
