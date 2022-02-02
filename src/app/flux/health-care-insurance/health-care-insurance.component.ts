import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../shared/format-datepicker';
import { NavService } from 'src/app/shared/services/nav.service';
import { IForm, ISelect } from 'src/app/shared/iform';
import * as moment from 'moment';

@Component({
  selector: 'app-health-care-insurance',
  templateUrl: './health-care-insurance.component.html',
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ]
})
export class HealthCareInsuranceComponent implements OnInit {

  public chk = false;
  private address = 'health_care_insurance/consulter/';
  public hint: boolean;
  public form: FormGroup;
  @Input() public showMessageRN;

  public desiredData: Array<ISelect> = [
    {value: 'insuringOrganization',  viewValue: 'OA et mutualité',                    checked: false, check: ''},
    {value: 'reimbursementRight',    viewValue: 'Droit au remboursement',             checked: false, check: ''},
    {value: 'ct1ct2',                viewValue: 'Codes CT1/CT2',                      checked: false, check: ''},
    {value: 'payingThirdParty',      viewValue: 'Droit au tiers payant',              checked: false, check: ''},
    {value: 'maximumCharge',         viewValue: 'Année où le plafond a été atteint',  checked: false, check: ''},
    {value: 'medicalHouse',          viewValue: 'Contrats avec maison médicale ',     checked: false, check: ''},
    {value: 'increasedIntervention', viewValue: 'Droit à l\'intervention majorée ',   checked: false, check: ''},
    {value: 'statusComplementaryInsurance', viewValue: 'Assurance complémentaire ',   checked: false, check: ''},
    {value: 'globalMedicalFile',            viewValue: 'Médecin gérant le dossier ',  checked: false, check: ''},
    {value: 'sfdfL891',                     viewValue: 'Données du formulaire L891 ', checked: false, check: ''}
  ];

  constructor(public navService: NavService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      rn: ['', Validators.required],
      date: ['']
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
    let box = '';
    this.desiredData.forEach((k, m) => {
      if (k.checked) {
        box += k.value + ',';
      }
    });

    box = box.substring(0, box.length - 1);
    const requestedData = box !== '' ? '&donnees_demandees=' + box : '';

    let date = moment(this.form.get('date').value).format('YYYY-MM-DD');
    date = (date !== 'Invalid date' ? '&date= ' + date : '');

    return this.address + '?env=' + this.navService.getNav().env +
      '&registre_national=' + this.form.get('rn').value +
      requestedData +
      date;
  }

  public actionCheckBox(index: number): Array<ISelect> {
    if (index !== -1) {
       this.desiredData.map((obj) => {
         if (this.desiredData[index].value === obj.value) {
           obj.checked = !obj.checked;
         }
       });
    } else {
      this.chk = !this.chk;
      this.desiredData.map((obj) => {
        obj.checked = this.chk;
        obj.check = (this.chk ? 'checked'  : '');
      });
    }
    return this.desiredData;
  }

}





