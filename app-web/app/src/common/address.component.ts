//common component for an address.
import { Component, OnInit } from '@angular/core';
import { Address }           from './address';
import { State }             from './state';

@Component({
  selector: 'AddressComponent',
  template: `<md-input-container>
              <input type="text" mdInput placeholder="Address 1" name="addr1" [(ngModel)]=address1>
             </md-input-container>
             <md-input-container>
              <input mdInput placeholder="Address 2" name="addr2" value="">
             </md-input-container>
             <md-input-container>
              <input mdInput placeholder="City" name="city" value="">
             </md-input-container>
             <md-select placeholder="State" [(ngModel)]="userState">
              <md-option *ngFor="let state of states" [value]="state.code">{{ state.name }}</md-option>
             </md-select>`,
  styles: ['.profile-card {width: 100%;}']
})
export class AddressComponent implements OnInit{
  private address   : Address;
  private states    :  Array<State>;
  private userState : State;

  constructor(){
    this.states = new Array<State>();
  }

  ngOnInit(){
    this.states.push(new State('TX',"Texas"));
    this.states.push(new State('AZ',"Arizona"));
    this.states.push(new State('CA',"California"));
    this.states.push(new State('IL',"Illinois"));
  }

}
