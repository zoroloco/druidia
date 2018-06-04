import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RegisterComponent} from "./register.component";
import { MaterialModule} from '../../app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    LoginComponent
  ],
  declarations: [ LoginComponent, RegisterComponent ],
  entryComponents: [ ],
  providers: [ ]
})
export class LoginModule { }
