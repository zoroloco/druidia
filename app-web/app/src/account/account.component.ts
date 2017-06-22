//component for user account manipulation.
import { Component, OnInit }from '@angular/core';
import { Address }          from '../common/address.model';
import { Account }          from './account.model';
import { State }            from '../common/state.model';
import { Logger, LogLevels }from '../loggers/logger.service';

@Component({
  selector: 'AccountComponent',
  templateUrl: 'html/account.template.html',
  styles: ['.profile-card {width: 100%;}']
})
export class AccountComponent implements OnInit{
  private myFilter: any;
  private minDate: Date;
  private maxDate: Date;
  private verticalAlign: boolean;

  private account: Account;

  constructor(private log:Logger){}

  ngOnInit(){
    this.init();
  }

  onGenderToggle(){
    this.log.log(LogLevels.INFO,"Gender toggle value="+this.account.gender);
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

  onSubmit(){
    this.log.log(LogLevels.INFO,"User Profile Submitted:"+this.account.address.address1);
  }
}
