// Component for login.
import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../../services';

@Component({
  selector: 'app-babynamer',
  templateUrl: './babynamer.component.html'
})
export class BabynamerComponent implements OnInit {

  constructor(private log: LoggerService) {

  }

  ngOnInit() {

  }
}
