// Component for login.
import { Component } from '@angular/core';
import {LoggerService} from '../../services';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent {

  constructor(private log: LoggerService) { }

}
