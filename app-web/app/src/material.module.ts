/*
The purpose of this module is to just group all of the material 2 modules.
This module will then be imported to our main app module that is the one
single module that gets bootstrapped in main.ts.
*/

import { NgModule }                from '@angular/core';
import { MdButtonModule,
	       MdCheckboxModule,
				 MdInputModule,
			   MdCardModule,
				 MdSlideToggleModule,
			   MdListModule,
				 MdDatepickerModule,
				 MdNativeDateModule,
				 MdSelectModule
			                }            from '@angular/material';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//single list of material 2 modules to import , export.
const materialModules = [
 MdButtonModule,
 MdCheckboxModule,
 MdInputModule,
 MdCardModule,
 MdSlideToggleModule,
 MdListModule,
 MdDatepickerModule,
 MdNativeDateModule,
 MdSelectModule
];

@NgModule({
  imports: [
            BrowserModule,
            BrowserAnimationsModule,
            materialModules],
  exports: [materialModules]
})
export class MaterialModule{}
