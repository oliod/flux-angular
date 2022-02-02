import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NavService } from 'src/app/shared/services/nav.service';
import { IForm } from 'src/app/shared/iform';

@Component({
  selector: 'app-identify-person',
  templateUrl: './identify-person.component.html'
})
export class IdentifyPersonComponent implements OnInit {

  private address = 'identify_person/consulter/';
  public hint: boolean;
  public form: FormGroup;
  @Input() public showMessageRN;

  constructor(public navService: NavService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      rn: ['', Validators.required]
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
      '&registre_national=' + this.form.get('rn').value;
  }

}






