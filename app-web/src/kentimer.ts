import { Component } from '@angular/core';
//import { bootstrap } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'kenTimer',
  template: `
       <h1> {{ minutes }}:{{ seconds | number: '2.0' }} </h1>
       <p>
           <button (click)="togglePause()">
             {{ buttonLabel }}
           </button>
           <button (click)="reset()">Reset</button>
       </p>`
})
export class KenTimerComponent{
  minutes: number;
  seconds: number;
  isPaused: boolean;
  buttonLabel: string;

  constructor(){
    this.reset();
    //start the counter
    setInterval(() => this.tick(), 1000);
  }

   private tick(): void {
     if (!this.isPaused) {
       this.buttonLabel = 'Pause';
       if (--this.seconds < 0) {
         this.seconds = 59;
         if (--this.minutes < 0) {
           this.reset();
         }
        }
       }
    }

  togglePause(): void {
    console.log("Toggle Pause - "+!this.isPaused);
     this.isPaused = !this.isPaused;
     // if countdown has started
     if (this.minutes < 24 || this.seconds < 59) {
       this.buttonLabel = this.isPaused ? 'Resume' : 'Pause';
     }
   }

   reset(): void {
     console.log("resetting time");
     this.minutes = 24;
     this.seconds = 59;
     this.buttonLabel = 'Start';
     this.togglePause();
   }
}
