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
import { CommonService }    from '../common/common.service';

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

  constructor(private log:Logger,private commonService:CommonService){
    this.states = new Array<State>();
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

    this.init();
  }

  onGenderToggle(){
    this.log.log("Gender toggle value="+this.accountForm.form.controls.genderName.value);
  }

  private init(){
    this.account       = new Account();
    this.myFilter      = (picker: Date) => picker.getFullYear() > 1885;
    this.minDate       =  new Date(1885, 0, 1);
    this.maxDate       =  new Date();
  }

  //action method
  onAddressStateSelected(stateSelected: State){
    this.log.log("Account knows that address selected state of:"+stateSelected.name);
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
