//component for user account manipulation.
import { Component,
         OnInit,
         ViewChild,
         Input,
         SimpleChanges }    from '@angular/core';
import { NgForm }           from '@angular/forms';
import { Account }          from './account.model';
import { State }            from './state.model';
import { User }             from '../auth/user';
import { Logger, LogLevels }from '../loggers/logger.service';
import { CommonService }    from '../common/common.service';
import { AccountService }   from './account.service';

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

  constructor(private log:Logger,
              private commonService:CommonService,
              private accountService:AccountService){
    this.states = new Array<State>();
    this.account= new Account();
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
  }

  ngOnInit(){
    this.log.log("ngOnInit of account component.");

    this.commonService.fetchStates().subscribe(
        fetchedStates => {
          this.states = fetchedStates;
          this.log.log("Received states.");
        },
        error => { this.log.log("Error fetching U.S. states.",LogLevels.ERROR) }
    );

    this.accountService.fetchAccount().subscribe(
      fetchedAccount => {
        this.log.info("Account info fetched.");
        this.account = fetchedAccount
      },
      error => { this.log.warn("No account info found:"+error)}
    );

    this.init();
  }

  private init(){
    this.myFilter      = (picker: Date) => picker.getFullYear() > 1885;
    this.minDate       =  new Date(1885, 0, 1);
    this.maxDate       =  new Date();
  }


  onGenderToggle(){
    this.log.log("Gender toggle value="+this.accountForm.form.controls.genderName.value);
  }

  //action method
  onAddressStateSelected(stateSelected: State){
    this.log.log("Account knows that address selected state of:"+stateSelected.name);
  }

  onInputEmail(e:any){
    this.account.email = e.target.value;
  }

  //user clicked on save button.
  onSaveAccount(){
    this.log.info("User clicked to save account information.");

    this.account.email            = this.accountForm.form.controls.emailName.value;
    this.account.gender           = this.accountForm.form.controls.genderName.value;
    this.account.address.address1 = this.accountForm.form.controls.address1Name.value;
    this.account.address.address2 = this.accountForm.form.controls.address2Name.value;
    this.account.address.city     = this.accountForm.form.controls.cityName.value;
    //this.account.address.state    = this.accountForm.form.controls.stateName.value;

    this.accountService.saveAccount(this.account)
      .subscribe(result=>this.log.info("Saved account result:"+result),
                 error=>this.log.error("Error saving account info:"+error));
  }
}
