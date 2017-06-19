//component for user account manipulation.
import { Component } from '@angular/core';

@Component({
  selector: 'AccountComponent',
  templateUrl: 'html/account.template.html'
})
export class AccountComponent{
  private address1: string;

  constructor(){
    this.address1 = "addr1";
  }
}
