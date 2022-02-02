import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavService } from 'src/app/shared/services/nav.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { IForm } from 'src/app/shared/iform';

@Component({
  selector: 'app-no-earning-capacity',
  templateUrl: './no-earning-capacity.component.html',
  providers: []
})
export class NoEarningCapacityComponent implements OnInit {

  private address = 'unemployment_data/neo/consulter/consultNoEarningCapacityAndLawsuitMutuality/';
  @Input() public hint: boolean;
  public form: FormGroup;
  @Input() public showMessageRN;

  constructor(public navService: NavService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group(
      {
        rn: ['', Validators.required]
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
      '&registre_national=' + this.form.get('rn').value;
  }

}

