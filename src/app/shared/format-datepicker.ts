import { NativeDateAdapter, MatDateFormats } from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { Injectable } from "@angular/core";

const moment = _rollupMoment || _moment;

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {

  public format(inputDate: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const dateFormat = 'YYYY-MM-DD';
      const toDateFormat = moment(inputDate).format(dateFormat);
      if (moment(toDateFormat, dateFormat, true).isValid()) {
        const d = toDateFormat.split('-');
        const year = d[0];
        const month = d[1];
        const day = d[2];
        return `${year}-${month}-${day}`;
      }
    }
    return inputDate.toDateString();
  }
}

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { year: 'numeric', month: 'short', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric'},
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

@Injectable()
export class AppDateAdapterYear extends NativeDateAdapter {
  format(inputDate: Date, displayFormat: Object): string {
    const dateFormat = 'YYYY';
    const toDateFormat = moment(inputDate).format(dateFormat);
    if (moment(toDateFormat, dateFormat, true).isValid()) {
      return moment(inputDate).format(dateFormat);
    }
    return inputDate.toDateString();
  }
}

export const APP_MODE_FORMATS_YEAR: MatDateFormats = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
