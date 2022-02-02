import { Component, OnInit, Input } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavService } from 'src/app/shared/services/nav.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { IForm, ISelect } from 'src/app/shared/iform';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-dolsis',
  templateUrl: './dolsis.component.html',
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ]
})
export class DolsisComponent implements OnInit {

  scopes: ISelect[] = [
    {value: 'active', viewValue: 'Active'},
    {value: 'activeInPeriod',  viewValue: 'ActiveInPeriod'},
    {value: 'mutations', viewValue: 'Mutations'}
  ];

  private address = 'dolsis/employeurs/consulter/';
  public selected: string;
  public hint: boolean;
  public form: FormGroup;
  @Input() public showMessageRN;

  constructor(public navService: NavService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      rn: ['', Validators.required],
      scope: ['', Validators.required],
      dateBegin: [''],
      dateEnd: ['']
    });
    this.form.valueChanges.subscribe(n => console.log(n));
  }

  onNotifyRN(message: string) {
    this.showMessageRN = message;
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

    let date = '';
    if (this.form.get('scope').value === 'activeInPeriod' ||
      this.form.get('scope').value === 'mutations') {
        const dateBegin = moment(this.form.get('dateBegin').value).format('YYYY-MM-DD');
        const dateEnd = moment(this.form.get('dateEnd').value).format('YYYY-MM-DD');
        date = '&date_debut=' + dateBegin + '&date_fin=' + dateEnd;
    }

    return this.address + '?env=' + this.navService.getNav().env +
      '&registre_national=' + this.form.get('rn').value +
      '&scope=' + this.form.get('scope').value + date;
  }

}
