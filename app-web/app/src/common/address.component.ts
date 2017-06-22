//common component for an address.

//this class defines an output, which makes it like a 'subject' that
//can be observed.  An observer is a component that uses this component
//and defines the output (addressStateSelected).

import { Component,
         OnInit,
         AfterViewInit,
         Input,EventEmitter }from '@angular/core';
import { Address }           from './address.model';
import { State }             from './state.model';
import { Logger, LogLevels } from '../loggers/logger.service';

@Component({
  selector: 'AddressComponent',
  template: `<md-input-container color="blue">
               <input mdInput placeholder="Address 1"
                      [required]=requiredFlag
                      [(ngModel)]=address.address1>
             </md-input-container>
             <div *ngIf="verticalAlign"><br/></div>
             <md-input-container color="blue">
              <input mdInput placeholder="Address 2"
                     [(ngModel)]=address.address2>
             </md-input-container>
             <div *ngIf="verticalAlign"><br/></div>
             <md-input-container color="blue">
              <md-hint>
                Enter your U.S. city name.
              </md-hint>
              <input mdInput placeholder="City"
                     [required]=requiredFlag
                     [(ngModel)]="address.city">
             </md-input-container>
             <md-select placeholder="State"
                        [required]=requiredFlag
                        [(ngModel)]=address.state>
              <md-option *ngFor="let state of states"
                        (click)="onState(state)"
                        [value]="state.code">{{ state.name }}
              </md-option>
             </md-select>
             <div *ngIf="verticalAlign"><br/></div>
             <md-input-container>
              <input mdInput placeholder="Zip"
                     [(ngModel)]=address.zip>
              <md-hint>
                Format: XXXXX
              </md-hint>
              <div mdSuffix>U.S.</div>
             </md-input-container>
             `,
   inputs: [ "verticalAlign" ],//a message from the outside world.
   outputs: ["addressStateSelected"]//a message to the outside world.
})
export class AddressComponent implements OnInit{
  @Input() address      : Address;//comes from the parent component.
  @Input('required') requiredFlag : any;//this input has an alias.
  private states        : Array<State>;
  private verticalAlign : string;
  addressStateSelected  : EventEmitter<State>;

  constructor(private log:Logger){
    this.states = new Array<State>();
    this.log.log(LogLevels.INFO,"Constructor:Vertical Align value="+this.verticalAlign);
    this.addressStateSelected = new EventEmitter<State>();
  }

  ngOnInit(){
    this.states.push(new State('TX',"Texas"));
    this.states.push(new State('AZ',"Arizona"));
    this.states.push(new State('CA',"California"));
    this.states.push(new State('IL',"Illinois"));
    this.log.log(LogLevels.INFO,"ngOnInit:Vertical Align value="+this.verticalAlign);
  }

  //called when you click on a state on the state dropdown.
  onState(state: State){
    this.log.log(LogLevels.INFO,"Emitted/propagating up state clicked event to any listeners:"+state.name);
    this.addressStateSelected.emit(state);
  }

}
