// Component for login.
import { Component, OnInit } from '@angular/core';
import {LoggerService, HumidiTempService} from '../../services';
import {Humiditemp} from "../../models";

@Component({
  selector: 'app-humiditemp',
  templateUrl: './humiditemp.component.html'
})
export class HumiditempComponent implements OnInit{
  masterClosetLatestHumiditemp: Humiditemp;

  constructor(private log: LoggerService, private humiditempService: HumidiTempService) {
    this.masterClosetLatestHumiditemp = new Humiditemp();
  }

  ngOnInit() {
    this.humiditempService.fetchLatestHumidiTemp().subscribe(latestHumiditemp=>{
      this.masterClosetLatestHumiditemp = latestHumiditemp;
    }, error=> {
      this.log.error('Error fetching latest humidity/temp for master closet:' + error);
    })
  }
}
