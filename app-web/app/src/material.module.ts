/*
The purpose of this module is to just group all of the material 2 modules.
This module will then be imported to our main app module that is the one
single module that gets bootstrapped in main.ts.
*/

import { NgModule }                from '@angular/core';
import { MdButtonModule,
	       MdCheckboxModule,
				 MdInputModule}            from '@angular/material';
import { BrowserModule }           from '@angular/platform-browser';
import {BrowserAnimationsModule}   from '@angular/platform-browser/animations';

@NgModule({
  imports: [
            BrowserModule,
            BrowserAnimationsModule,
            MdButtonModule,
  	        MdCheckboxModule,
  			   	MdInputModule],
  exports: [
            MdButtonModule,
  	        MdCheckboxModule,
  				  MdInputModule]
})
export class MaterialModule{}
