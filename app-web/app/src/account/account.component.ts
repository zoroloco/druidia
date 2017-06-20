//component for user account manipulation.
import { Component, OnInit }        from '@angular/core';
import { AddressComponent } from '../common/address.component';
import { UserProfile }      from './userProfile';
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

  private userProfile: UserProfile;

  constructor(private log:Logger){}

  ngOnInit(){
    this.init();
  }

  onGenderToggle(){
    this.log.log(LogLevels.INFO,"Gender toggle value="+this.userProfile.gender);
  }

  private init(){
    this.verticalAlign = true;
    this.userProfile   = new UserProfile();
    this.myFilter      = (picker: Date) => picker.getFullYear() > 1885;
    this.minDate       =  new Date(1885, 0, 1);
    this.maxDate       =  new Date();
  }
}
