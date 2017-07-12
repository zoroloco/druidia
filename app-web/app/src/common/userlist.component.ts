import { Component, OnInit } from '@angular/core';
import { BaseUser }  from '../auth/baseUser';
import { User }      from '../auth/user';
import { FacebookUser } from '../auth/facebookUser';
import { Logger,LogLevels } from '../loggers/logger.service';

@Component({
  selector: 'user-list',
  templateUrl: 'html/userList.template.html'
})
export class UserListComponent{
  private users: Array<User>;

  constructor(private log:Logger){
    this.users = new Array<User>();
  }

  ngOnInit(){
    
  }

}
