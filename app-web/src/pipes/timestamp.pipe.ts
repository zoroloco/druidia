import { Pipe, PipeTransform } from '@angular/core';

// This pipe converts 2017:06:13 00:09:04:731 -> 06-13-2017 00:09:04

@Pipe({name: 'timestampPipe'})
export class TimeStampPipe implements PipeTransform {
  transform(timeStampStr: string): string {
    const dateTimeSplit = timeStampStr.split(' ');
    const dateStr       = dateTimeSplit[0].substring(1, dateTimeSplit[0].length); // 2017:06:13
    const timeStr       = dateTimeSplit[1].substring(0, dateTimeSplit[0].length - 1); // 00:08:45:8
    const dateSplit     = dateStr.split(':');
    const timeSplit     = timeStr.split(':');

    const yearStr       = dateSplit[0];
    const monthStr      = dateSplit[1];
    const dayStr        = dateSplit[2];
    const hourStr       = timeSplit[0];
    const minuteStr     = timeSplit[1];
    const secondStr     = timeSplit[2];

    return monthStr + '-' + dayStr + '-' + yearStr + ' ' + hourStr + ':' + minuteStr + ':' + secondStr;
  }
}
