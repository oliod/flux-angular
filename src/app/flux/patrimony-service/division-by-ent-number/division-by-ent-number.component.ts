import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavService } from 'src/app/shared/services/nav.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { IForm, ISelect } from 'src/app/shared/iform';
import { ICON_EDIT } from 'src/app/shared/app-settings';

@Component({
  selector: 'app-find-division-by-ent-number',
  templateUrl: './division-by-ent-number.component.html'
})
export class FindDivisionByEntNumberComponent implements OnInit {

  languages: ISelect[] = [
    {value: 'FR', viewValue: 'FR'},
    {value: 'NL',  viewValue: 'NL'},
    {value: 'DE', viewValue: 'DE'}
  ];

  private address = 'patrimony_service/consulter/find_division_by_enterprise_number/';
  @Input() public hint: boolean;
  public form: FormGroup;
  @Input() public showMessageRN;
  public iconEdit = ICON_EDIT;

  constructor(public navService: NavService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group(
      {
        enterpriseNumber: ['', Validators.required],
        language: ['', Validators.required],
        history: [false, []]
      }
    );
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

    return this.address + '?env=' + this.navService.getNav().env +
      '&enterprise_number=' + this.form.get('enterpriseNumber').value +
      '&language=' + this.form.get('language').value +
      '&history=' + this.form.get('history').value;
  }

}
