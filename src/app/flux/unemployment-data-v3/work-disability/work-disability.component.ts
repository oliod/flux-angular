import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NavService } from 'src/app/shared/services/nav.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { IForm } from 'src/app/shared/iform';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-work-disability',
  templateUrl: './work-disability.component.html',
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ]
})
export class WorkDisabilityComponent implements OnInit {

  private address = 'unemployment_data/neo/consulter/consultWorkDisabilityHistory/';

  @Input() public hint: boolean;
  public form: FormGroup;
  @Input() public showMessageRN;
  public dateFormat = 'YYYY-MM-DD';

  constructor(public router: Router, public navService: NavService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group(
      {
        rn: ['', Validators.required],
        dateBegin: [''],
        dateEnd: ['']
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
      '&registre_national=' + this.form.get('rn').value +
      '&date_debut=' + (dateBegin !== 'Invalid date' ? dateBegin : '') +
      '&date_fin=' + (dateEnd !== 'Invalid date' ? dateEnd : '');
  }

}
