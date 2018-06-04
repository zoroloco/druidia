import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppLayoutComponent} from "../../components/app-layout";
import {UserService} from "../../services";
import {MovieComponent} from "../movies/movie.component";

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
          team: UserService
        },
        children: [
          {
            path: 'movies',
            component: MovieComponent,
            data: {
              title: 'movies'
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
