/*
The purpose of this module is to just group all of the material 2 modules.
This module will then be imported to our main app module that is the one
single module that gets bootstrapped in main.ts.
*/

import { NgModule }                from '@angular/core';
import { MatButtonModule,
         MatCheckboxModule,
         MatInputModule,
         MatCardModule,
         MatRadioModule,
         MatGridListModule,
         MatSlideToggleModule,
         MatListModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatSelectModule,
         MatTableModule,
         MatDialogModule }  from '@angular/material';

// single list of material 2 modules to import , export.
const MATERIAL_MODULES = [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule
];

@NgModule({
  imports: [MATERIAL_MODULES],
  exports: [MATERIAL_MODULES]
})
export class MaterialModule { }
