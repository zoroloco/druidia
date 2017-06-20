//common component for an address.
import { Component,
         OnInit,
         AfterViewInit,
         Input }             from '@angular/core';
import { Address }           from './address';
import { State }             from './state';
import { Logger, LogLevels } from '../loggers/logger.service';

@Component({
  selector: 'AddressComponent',
  template: `<md-input-container color="red">
               <input type="text" mdInput placeholder="Address 1" [required]=requiredFlag name="addr1" [(ngModel)]=address.address1>
             </md-input-container>
             <div *ngIf="verticalAlign"><br/></div>
             <md-input-container color="gray">
              <input mdInput placeholder="Address 2" name="addr2" [required]=requiredFlag [(ngModel)]=address.address2>
             </md-input-container>
             <div *ngIf="verticalAlign"><br/></div>
             <md-input-container color="red">
              <md-hint>
                Enter your U.S. city name.
              </md-hint>
              <input mdInput placeholder="City" name="city" [required]=requiredFlag [(ngModel)]=address.city>
              <div mdSuffix>United States</div>
             </md-input-container>
             <div *ngIf="verticalAlign"><br/></div>
             <md-select placeholder="State" [required]=requiredFlag [(ngModel)]=address.state>
              <md-option *ngFor="let state of states" [value]="state.code">{{ state.name }}</md-option>
             </md-select>
             <div *ngIf="verticalAlign"><br/></div>
             `,
   inputs: [ "verticalAlign" ]
})
export class AddressComponent implements OnInit{
  @Input() address      : any;//comes from the parent component.
  @Input('required') requiredFlag : any;//this input has an alias.
  private states        : Array<State>;
  private verticalAlign : string;

  constructor(private log:Logger){
    this.states = new Array<State>();
    this.log.log(LogLevels.INFO,"Constructor:Vertical Align value="+this.verticalAlign);
  }

  ngOnInit(){
    this.states.push(new State('TX',"Texas"));
    this.states.push(new State('AZ',"Arizona"));
    this.states.push(new State('CA',"California"));
    this.states.push(new State('IL',"Illinois"));
    this.log.log(LogLevels.INFO,"ngOnInit:Vertical Align value="+this.verticalAlign);
  }

}
