//component for user account manipulation.
import { Component,
         OnInit,
         ViewChild,
         Input,
         SimpleChanges }    from '@angular/core';
import { NgForm }           from '@angular/forms';
import { Account }          from './account.model';
import { State }            from './state.model';
import { Logger, LogLevels }from '../loggers/logger.service';

@Component({
  selector: 'AccountComponent',
  templateUrl: 'html/account.template.html',
  styles: [`.profile-card {width: 100%;}
            .mat-input-container.ng-invalid.ng-dirty{ border: 1px solid red;}
          `],
  styleUrls: ['resources/global.css' ]
})
export class AccountComponent implements OnInit{
  private myFilter: any;
  private minDate: Date;
  private maxDate: Date;
  private states : Array<State>;

  private account: Account;

  @ViewChild('accountForm') accountForm: NgForm;
  //@ViewChild('addressComponent') addressComponent: AddressComponent;

  constructor(private log:Logger){
    this.log.log(LogLevels.INFO,"Constructor called.");
    this.states = new Array<State>();
  }

  ngOnChanges(changes: SimpleChanges){
    this.log.log(LogLevels.INFO,"ngOnChanges");
    console.log(changes);
  }

  ngOnInit(){
    this.log.log(LogLevels.INFO,"ngOnInit");

    this.states.push(new State('TX',"Texas"));
    this.states.push(new State('AZ',"Arizona"));
    this.states.push(new State('CA',"California"));
    this.states.push(new State('IL',"Illinois"));

    this.init();
  }

  onGenderToggle(){
    this.log.log(LogLevels.INFO,"Gender toggle value="+this.accountForm.form.controls.genderName.value);
  }

  private init(){
    this.account       = new Account();
    this.myFilter      = (picker: Date) => picker.getFullYear() > 1885;
    this.minDate       =  new Date(1885, 0, 1);
    this.maxDate       =  new Date();
  }

  //action method
  onAddressStateSelected(stateSelected: State){
    this.log.log(LogLevels.INFO,"Account knows that address selected state of:"+stateSelected.name);
  }

  onInputEmail(e:any){
    this.account.email = e.target.value;
  }

  onSaveAccount(){
    //console.log(this.accountForm.form.controls.emailName.value);
    //this.email = this.accountForm.form.controls.emailName.value;
    //this.log.log(LogLevels.INFO,"Gender:"+formValue.genderName);
    //this.log.log(LogLevels.INFO,"Date:"+formValue.dateName);
  }
}
