import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavService } from 'src/app/shared/services/nav.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { IForm, ISelect } from 'src/app/shared/iform';

@Component({
  selector: 'app-retrieve-ti-groups-v2',
  templateUrl: './retrieve-ti-groups-v2.component.html',
  providers: []
})
export class RetrieveTiGroupsV2Component implements OnInit {

  langues: ISelect[] = [
    {value: 'fr', viewValue: 'Français'},
    {value: 'nl',  viewValue: 'Néerlandais'}
  ];

  private address = 'transaction25/v2/consulter/';
  @Input() public hint: boolean;
  public form: FormGroup;
  @Input() public showMessageRN;

  constructor(public navService: NavService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group(
      {
        rn: ['', Validators.required],
        historicite: [true, []],
        langue: ['', Validators.required]
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

    const box = '&historicite=' + ( (this.form.get('historicite').value) ? '1' : '0');

    return this.address + '?env=' + this.navService.getNav().env +
      '&registre_national=' + this.form.get('rn').value +
      '&langue=' + this.form.get('langue').value + box;
  }

}
