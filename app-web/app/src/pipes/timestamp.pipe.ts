import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timestampPipe'})
export class TimeStampPipe implements PipeTransform {

  //Convert 2017:06:13 00:09:04:731 -> 06-13-2017 00:09:04
  transform(timeStampStr: string): string {
    let dateTimeSplit = timeStampStr.split(" ");
    let dateStr       = dateTimeSplit[0].substring(1,dateTimeSplit[0].length);//2017:06:13
    let timeStr       = dateTimeSplit[1].substring(0,dateTimeSplit[0].length-1)//00:08:45:8

    let dateSplit     = dateStr.split(":");
    let timeSplit     = timeStr.split(":");

    let yearStr       = dateSplit[0];
    let monthStr      = dateSplit[1];
    let dayStr        = dateSplit[2];
    let hourStr       = timeSplit[0];
    let minuteStr     = timeSplit[1];
    let secondStr     = timeSplit[2];

    return monthStr+"-"+dayStr+"-"+yearStr+" "+hourStr+":"+minuteStr+":"+secondStr;
  }
}
