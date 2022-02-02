import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NavService } from 'src/app/shared/services/nav.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { IForm, ISelect } from 'src/app/shared/iform';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';
import * as moment from 'moment';

// { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' },
@Component({
  selector: 'app-child-benefits',
  templateUrl: './child-benefits.component.html',
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ]
})
export class ChildBenefitsComponent implements OnInit {

  sources: ISelect[] = [
    {value: 'WALLONIA', viewValue: 'WALLONIA'},
    {value: 'FEDERAL',  viewValue: 'FEDERAL'},
    {value: 'BRUSSELS', viewValue: 'BRUSSELS'},
    {value: 'FLANDERS', viewValue: 'FLANDERS'},
    {value: 'EASTBELGIUM', viewValue: 'EASTBELGIUM'}
  ];

  private address = 'childbenefits/consulter/';
  public hint: boolean;
  public form: FormGroup;
  public dateFormat = 'YYYY-MM-DD';
  @Input() public showMessageRN;

  constructor(public navService: NavService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      rn: ['', Validators.required],
      source: ['', Validators.required],
      dateBegin: ['', Validators.required],
      dateEnd: ['', Validators.required]
    });
    this.form.valueChanges.subscribe(n => console.log(n));
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
      '&source=' + this.form.get('source').value +
      '&date_debut=' + dateBegin +
      '&date_fin=' + dateEnd;
  }

}
