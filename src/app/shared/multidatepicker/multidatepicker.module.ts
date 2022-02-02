import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiDatepickerComponent } from './multidatepicker.component';
import { YearPickerComponent } from './year-picker-component/year-picker.component';
import { MonthPickerComponent } from './month-picker-component/month-picker.component';
import { RegularDatepickerComponent } from './regular-datepicker-component/regular-datepicker.component';
import { InfoDialogComponent } from './month-picker-component/dialog/info-dialog/info-dialog.component';
import { MaterialModule } from 'src/app/modules/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    InfoDialogComponent,
    MultiDatepickerComponent,
    MonthPickerComponent,
    YearPickerComponent,
    RegularDatepickerComponent,
  ],
  entryComponents: [InfoDialogComponent],
  exports: [
    MultiDatepickerComponent,
  ],
})
export class MultiDatepickerModule { }