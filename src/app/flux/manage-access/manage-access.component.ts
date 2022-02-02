import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NavService } from 'src/app/shared/services/nav.service';
import { IForm, ISelect } from 'src/app/shared/iform';
import { ICON_EDIT } from 'src/app/shared/app-settings';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-access',
  templateUrl: './manage-access.component.html',
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ]
})
export class ManageAccessComponent implements OnInit {

  qualityCode: ISelect[] = [
    {value: '1', viewValue: 'Dossier en cours'},
    {value: '2',  viewValue: 'Minimex ou RI'},
    {value: '3',  viewValue: 'Equivalent Minimex ou RI'},
    {value: '4',  viewValue: 'Autre aide'},
    {value: '5',  viewValue: 'SDF ou sans aide'},
    {value: '6',  viewValue: 'Article 60'},
    {value: '40',  viewValue: 'Fond mazout'}
  ];

  private address = 'identify_person/consulter/';

  public btnName = 'Recherche';
  public btnHiteClear = true;
  public iconEdit = ICON_EDIT;
  public hint: boolean;
  public form: FormGroup;
  @Input() public showMessageRN;
  public dateFormat = 'YYYY-MM-DD';

  @ViewChild('search', {static: false}) public search: ElementRef;

  constructor(public navService: NavService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      rn: ['', Validators.required],
      familyName: [''],
      dateBirth: [''],
      qualityCode: [''],
      dateBegin: [''],
      dateEnd: ['']
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

  public getValueFromInputApi(event: string): IForm {
    return {
      callValueFromInput: () => {
        return this.getValueFromInput(event);
      }
    };
  }

  public getValueFromInput(name: string): string {

    console.log('=> ', name );

    
    if (this.navService.getNav().env === undefined) {
      const dialogRef = this.dialog.open( ConfirmDialogComponent, {
        data: { Erreur: 'Une erreur d\'application s\'est produite' }
      });
      dialogRef.afterClosed();
      return 'ERROR';
    }
    return this.address + '?env=' + this.navService.getNav().env +
      '&registre_national=' + this.form.get('rn').value;
  }

}






