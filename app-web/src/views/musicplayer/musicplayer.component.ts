// Component for login.
import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import {LoggerService, MusicPlayerService} from '../../services';
import {MatTableDataSource} from '@angular/material';
import { faPlay, faStop, faRandom, faForward, faBackward, faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html'
})
export class MusicPlayerComponent implements OnInit {
  datasource: any;
  displayedColumns = ['title', 'time'];
  faPlay = faPlay;
  faStop = faStop;
  faRandom = faRandom;
  faForward = faForward;
  faBackward = faBackward;
  faSync = faSync;

  constructor(private log: LoggerService, private musicPlayerService: MusicPlayerService) {

  }

  ngOnInit(): void {
    this.refreshSongHistory();
  }

  onShuffle(){
    this.musicPlayerService.shuffle()
      .subscribe(
        data => {
          this.log.info('Successfully sent a shuffle command.');
          this.refreshSongHistory();
        },
        error => {
          if (!_.isEmpty(error)) {
            this.log.error('Error trying to shuffle:' + JSON.stringify(error)); 
          }
        });
  }

  onPrev() {
    this.musicPlayerService.prev()
      .subscribe(
        data => {
          this.log.info('Successfully sent a prev command.');
          this.refreshSongHistory();
        },
        error => {
          if (!_.isEmpty(error)) {
            this.log.error('Error trying to go to previous song:' + JSON.stringify(error));
        }
        });
  }

  onNext() {
    this.musicPlayerService.next()
      .subscribe(
        data => {
          this.log.info('Successfully sent a next command.');
          this.refreshSongHistory();
        },
        error => {
          if (!_.isEmpty(error)){
            this.log.error('Error trying to go to next song:'+JSON.stringify(error));
          }
        });
  }

  onPlay() {
    this.musicPlayerService.play()
      .subscribe(
        data => {
          this.log.info('Successfully sent a play command.');
          this.refreshSongHistory();
    },
      error => {
        if (!_.isEmpty(error)) {
          this.log.error('Error trying to play:' + JSON.stringify(error));
        }
      });
  }

  onStop() {
    this.musicPlayerService.stop()
      .subscribe(
        data => {
          this.log.info('Successfully sent a stop command.');
          this.refreshSongHistory();
        },
        error => {
          if (!_.isEmpty(error)){this.log.error('Error trying to stop:' + JSON.stringify(error));
        }
        });
  }

  refreshSongHistory() {
    this.musicPlayerService.fetchSongHistory().subscribe(songs => {
      this.datasource = new MatTableDataSource(songs);
    }, error => {
      this.log.error('Error fetching songs.');
    });
  }
}
