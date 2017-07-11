//common component for an address.

//this class defines an output, which makes it like a 'subject' that
//can be observed.  An observer is a component that uses this component
//and defines the output (addressStateSelected).

import { Component,
         OnInit,
         AfterViewInit,
         ViewChild,
         Input,EventEmitter }from '@angular/core';
import { NgForm ,FormControl}            from '@angular/forms';
import { Address }           from './address.model';
import { State }             from './state.model';
import { Logger, LogLevels } from '../loggers/logger.service';

@Component({
  selector: 'AddressComponent',
  templateUrl: 'html/address.template.html',
  inputs: [ "verticalAlign" ],//a message from the outside world.
  outputs: ["addressStateSelected"],//a message to the outside world.
  styles: ['.mat-input-container.ng-invalid.ng-dirty{ border: 1px solid red;}']
})
export class AddressComponent implements OnInit{
  @Input() address      : Address;//comes from the parent component.
  @Input('required') requiredFlag : boolean;//this input has an alias.
  private states        : Array<State>;
  private verticalAlign : string;
  private addressStateSelected  : EventEmitter<State>;
  @ViewChild('addressForm') addressForm: NgForm;

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
    //this.log.log(LogLevels.INFO,"Emitted/propagating up state clicked event to any listeners:"+state.name);
    //console.log(addressGroup.value);
    //this.addressStateSelected.emit(state);
  }

  //called from some parent component when the form is submitted.
  public onSubmit(){
    this.log.log(LogLevels.INFO,"Parent component has submitted their form.");

    let c:any;
    for(c in this.addressForm.form.controls){
      let control:FormControl = c;
      console.log("control value = "+control.value);
    }

    console.log("YOUR FORM:  "+this.addressForm.form.get('address1Name'));


// TODO: figure out why for loop up there doesnt go in and learn directives!!!



  }

}
