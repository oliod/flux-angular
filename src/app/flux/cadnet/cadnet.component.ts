import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ICON_EDIT } from 'src/app/shared/app-settings';
import { NavService } from 'src/app/shared/services/nav.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { IForm, ISelect } from 'src/app/shared/iform';

@Component({
  selector: 'app-cadnet',
  templateUrl: './cadnet.component.html'
})
export class CadnetComponent implements OnInit {

  natures: ISelect[] = [
    {value: '1', viewValue: 'Demandeur'},
    {value: '2', viewValue: 'Cohabitant'},
    {value: '3', viewValue: 'Débiteur alimentaire'}
  ];

  langs: ISelect[] = [
    {value: 'fr', viewValue: 'Français'},
    {value: 'nl', viewValue: 'Néerlandais'}
  ];

  private address = 'cadnet/consulter/';
  public hint: boolean;
  public form: FormGroup;
  public iconEdit = ICON_EDIT;
  @Input() public showMessageRN;

  constructor(public navService: NavService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      rn: ['', Validators.required],
      langue: ['', Validators.required],
      nature: ['', Validators.required]
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

    return this.address + '?env=' + this.navService.getNav().env +
      '&registre_national=' + this.form.get('rn').value +
      '&langue=' + this.form.get('langue').value +
      '&nature_personne=' + this.form.get('nature').value;
  }

}
