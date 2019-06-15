// Component for login.
import { Component, OnInit } from '@angular/core';
import {LoggerService, HumidiTempService} from '../../services';
import {Humiditemp} from '../../models';

@Component({
  selector: 'app-humiditemp',
  templateUrl: './humiditemp.component.html'
})
export class HumiditempComponent implements OnInit{
  masterClosetLatestHumiditemp: Humiditemp;
  upstairsLatestHumiditemp: Humiditemp;

  constructor(private log: LoggerService, private humiditempService: HumidiTempService) {
    this.masterClosetLatestHumiditemp = new Humiditemp();
    this.upstairsLatestHumiditemp = new Humiditemp();
  }

  ngOnInit() {
    this.humiditempService.fetchLatestHumidiTemp('master-closet').subscribe(latestHumiditemp => {
      this.masterClosetLatestHumiditemp = latestHumiditemp;
      this.log.info('RX latest master closet humiditemp:' + JSON.stringify(this.masterClosetLatestHumiditemp));
    }, error => {
      this.log.error('Error fetching latest humidity/temp for master closet:' + error);
    });

    this.humiditempService.fetchLatestHumidiTemp('upstairs').subscribe(latestHumiditemp => {
      this.upstairsLatestHumiditemp = latestHumiditemp;
      this.log.info('RX latest upstairs humiditemp:' + JSON.stringify(this.upstairsLatestHumiditemp));
    }, error => {
      this.log.error('Error fetching latest humidity/temp for upstairs:' + error);
    });
  }
}
