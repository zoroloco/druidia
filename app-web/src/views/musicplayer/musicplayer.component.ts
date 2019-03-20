// Component for login.
import { Component } from '@angular/core';
import * as _ from 'underscore';
import {LoggerService, MusicPlayerService} from '../../services';

@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html'
})
export class MusicPlayerComponent {

  constructor(private log: LoggerService, private musicPlayerService: MusicPlayerService) {

  }

  onShuffle(){
    this.musicPlayerService.shuffle()
      .subscribe(
        data=>{
          this.log.info('Successfully sent a shuffle command.');
        },
        error=>{
          if(!_.isEmpty(error)){this.log.error('Error trying to shuffle:'+JSON.stringify(error));}
        })
  }

  onPrev(){
    this.musicPlayerService.prev()
      .subscribe(
        data=>{
          this.log.info('Successfully sent a prev command.');
        },
        error=>{
          if(!_.isEmpty(error)){this.log.error('Error trying to go to previous song:'+JSON.stringify(error));}
        })
  }

  onNext(){
    this.musicPlayerService.next()
      .subscribe(
        data=>{
          this.log.info('Successfully sent a next command.');
        },
        error=>{
          if(!_.isEmpty(error)){this.log.error('Error trying to go to next song:'+JSON.stringify(error));}
        })
  }

  onPlay(){
    this.musicPlayerService.play()
      .subscribe(
        data=>{
          this.log.info('Successfully sent a play command.');
    },
      error=>{
        if(!_.isEmpty(error)){this.log.error('Error trying to play:'+JSON.stringify(error));}
      })
  }

  onStop(){
    this.musicPlayerService.stop()
      .subscribe(
        data=>{
          this.log.info('Successfully sent a stop command.');
        },
        error=>{
          if(!_.isEmpty(error)){this.log.error('Error trying to stop:'+JSON.stringify(error));}
        })
  }
}
