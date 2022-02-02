import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NavService } from 'src/app/shared/services/nav.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { IForm, ISelect } from 'src/app/shared/iform';
import { APP_MODE_FORMATS_YEAR, AppDateAdapterYear } from 'src/app/shared/format-datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-contributions',
  templateUrl: './contributions.component.html',
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapterYear },
    { provide: MAT_DATE_FORMATS, useValue: APP_MODE_FORMATS_YEAR }
  ]
})
export class ContributionsComponent implements OnInit {

  private address = 'self_employed/v2/consulter/contributions/';

  @Input() public hint: boolean;
  public form: FormGroup;
  @Input() public showMessageRN;
  public dateFormat = 'YYYY';
  public selected: string;

  quadr: ISelect[] = [
    {value: '1', viewValue: 'Premier'},
    {value: '2', viewValue: 'Deuxième'},
    {value: '3', viewValue: 'Troisième'},
    {value: '4', viewValue: 'Quatrième'},
  ];

  constructor(public navService: NavService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group(
      {
        rn: ['', Validators.required],
        dateBegin: ['', Validators.required],
        dateEnd: ['', Validators.required],
        quadrBegin: ['', Validators.required],
        quadrEnd: ['', Validators.required],
      }
    );
    this.selecteQ();

  }

  selecteQ() {
    this.selected = Math.floor((new Date().getMonth() + 3) / 3).toString();
  }

  chosenYearHandler(year: Moment,  picker: MatDatepicker<Moment>, name: string): void {
    this.form.get(name).setValue(year);
    picker.close();
  }

  onNotifyRN(message: string) {
    this.showMessageRN = message;
  }

  public getDateError(pickerInput: string): string {
    const toDateFormat = moment(new Date(pickerInput)).format(this.dateFormat);
    if (!moment(toDateFormat, this.dateFormat, true).isValid()) {
      return 'Entrée non valide: veuillez saisir une chaîne sous la forme de ' + this.dateFormat;
    }
  }

  public getValueFromInputApi(): IForm {
    return {
      callValueFromInput: (name) => {
        return this.getValueFromInput(name);
      }
    };
  }

  public getValueFromInput(name: string): string {
    if (this.navService.getNav().env === undefined) {
      const dialogRef = this.dialog.open( ConfirmDialogComponent, {
        data: { Erreur: 'Une erreur d\'application s\'est produite' }
      });
      dialogRef.afterClosed();
      return 'ERROR';
    }

    const dateBegin = moment(this.form.get('dateBegin').value).format(this.dateFormat);
    const dateEnd = moment(this.form.get('dateEnd').value).format(this.dateFormat);

    return this.address + '?env=' + this.navService.getNav().env +
      '&registre_national=' + this.form.get('rn').value +
      '&date_debut=' + (dateBegin !== 'Invalid date' ? dateBegin : '') +
      this.form.get('quadrBegin').value +
      '&date_fin=' + (dateEnd !== 'Invalid date' ? dateEnd : '') +
      this.form.get('quadrEnd').value;
  }

}

