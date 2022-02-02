import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, ICON_EDIT } from '../../shared/app-settings';
import { IForm } from '../../shared/iform';
import { NavService } from '../../shared/services/nav.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-alert-reaction',
  templateUrl: './alert-reaction.component.html'
})
export class AlertReactionComponent implements OnInit {

  private address = 'alert_reaction/consulter/';
  @Input() public alertid: number;
  @Input() public reference: number;
  @Input() public motivation: number;
  @Input() public comment: number;
  @Input() public hint: boolean;

  private data = {
    alertid:    this.alertid,
    reference:  this.reference,
    motivation: this.motivation,
    comment:    this.comment
  };

  public form: FormGroup;
  private pattern: any;
  public iconEdit = ICON_EDIT;

  public constructor(public navService: NavService, public dialog: MatDialog) { }

  public ngOnInit(): void {
    const formData = {};
    for (const prop of Object.keys(this.data)) {
      this.pattern = (
        prop === 'comment' ?
        AppSettings.REGEX.STRING_SIMPLE :
        AppSettings.REGEX.NUMBER_SIMPLE
      );
      formData[prop] = new FormControl(
        this.data[prop],
        [ Validators.required, Validators.pattern(this.pattern) ]
      );
    }
    this.form = new FormGroup(formData);
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
      '&alertId=' + this.form.get('alertid').value +
      '&formNumber=' + this.form.get('reference').value +
      '&codeM=' + this.form.get('motivation').value +
      '&comment=' + this.form.get('comment').value;
  }

}
