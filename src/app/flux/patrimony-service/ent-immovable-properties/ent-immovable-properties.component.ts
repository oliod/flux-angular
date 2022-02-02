import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NavService } from 'src/app/shared/services/nav.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { IForm, ISelect } from 'src/app/shared/iform';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';
import * as moment from 'moment';
import { ICON_EDIT } from 'src/app/shared/app-settings';

@Component({
  selector: 'app-ent-immovable-properties',
  templateUrl: './ent-immovable-properties.component.html',
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ]
})
export class EntImmovablePropertiesComponent implements OnInit {

  languages: ISelect[] = [
    {value: 'FR', viewValue: 'FR'},
    {value: 'NL',  viewValue: 'NL'},
    {value: 'DE', viewValue: 'DE'}
  ];

  private address = 'patrimony_service/consulter/enterprise_immovable_properties/';
  @Input() public hint: boolean;
  public form: FormGroup;
  @Input() public showMessageRN;
  public dateFormat = 'YYYY-MM';
  public iconEdit = ICON_EDIT;

  constructor(public navService: NavService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group(
      {
        enterpriseNumber: ['', Validators.required],
        dateBegin: [''],
        dateEnd: [''],
        division: [false, []],
        fullHistory: [false, []],
        withCoOwners: [false, []],
        language: ['', Validators.required]
      }
    );
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
      '&enterprise_number=' + this.form.get('enterpriseNumber').value +
      '&date_debut=' + (dateBegin !== 'Invalid date' ? dateBegin : '') +
      '&date_fin=' + (dateEnd !== 'Invalid date' ? dateEnd : '') +
      '&language=' + this.form.get('language').value +
      '&division=' + this.form.get('division').value +
      '&fullHistory =' + this.form.get('fullHistory').value +
      '&withCoOwners=' + this.form.get('withCoOwners').value;
  }

}
