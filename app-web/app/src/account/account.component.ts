//component for user account manipulation.
import { Component,
         OnChanges,
         OnInit,
         DoCheck,
         AfterContentInit,
         AfterContentChecked,
         AfterViewInit,
         AfterViewChecked,
         ViewChild,
         OnDestroy,
         Input,
         SimpleChanges }            from '@angular/core';
import { NgForm }           from '@angular/forms';
import { Address }          from '../common/address.model';
import { Account }          from './account.model';
import { State }            from '../common/state.model';
import { Logger, LogLevels }from '../loggers/logger.service';
import { AddressComponent } from '../common/address.component';

@Component({
  selector: 'AccountComponent',
  templateUrl: 'html/account.template.html',
  styles: [`.profile-card {width: 100%;}
            .mat-input-container.ng-invalid.ng-dirty{ border: 1px solid red;}
          `]
})
export class AccountComponent implements OnInit{
  private myFilter: any;
  private minDate: Date;
  private maxDate: Date;
  private verticalAlign: boolean;

  private account: Account;
  private email: string;

  @ViewChild('accountForm') accountForm: NgForm;
  //@ViewChild('addressComponent') addressComponent: AddressComponent;

  constructor(private log:Logger){
    this.log.log(LogLevels.INFO,"Constructor called.");
  }

  ngOnChanges(changes: SimpleChanges){
    this.log.log(LogLevels.INFO,"ngOnChanges");
    console.log(changes);
  }

  ngOnInit(){
    this.log.log(LogLevels.INFO,"ngOnInit");
    this.init();
  }

  ngDoCheck(){
    this.log.log(LogLevels.INFO,"ngDoCheck");
  }

  ngAfterContentInit(){
    this.log.log(LogLevels.INFO,"ngAfterContentInit");
  }

  ngAfterContentChecked(){
    this.log.log(LogLevels.INFO,"ngAfterContentChecked");
  }

  ngAfterViewInit(){
    this.log.log(LogLevels.INFO,"ngAfterViewInit");
  }

  ngAfterViewChecked(){
    this.log.log(LogLevels.INFO,"ngAfterViewChecked");
  }

  ngOnDestroy(){
    this.log.log(LogLevels.INFO,"ngOnDestroy");
  }

  onGenderToggle(){
    this.log.log(LogLevels.INFO,"Gender toggle value="+this.accountForm.form.controls.genderName.value);
  }

  private init(){
    this.verticalAlign = true;
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
    this.email = e.target.value;
  }

  onSaveAccount(addressComponent: AddressComponent){
    console.log(this.accountForm.form.controls.emailName.value);
    //this.email = this.accountForm.form.controls.emailName.value;
    //this.log.log(LogLevels.INFO,"Gender:"+formValue.genderName);
    //this.log.log(LogLevels.INFO,"Date:"+formValue.dateName);
    addressComponent.onSubmit();
  }
}
