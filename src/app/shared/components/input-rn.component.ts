import { Component, OnInit, Output, EventEmitter, ViewChild,
  AfterViewInit,
  ElementRef,
  Input,
  AfterViewChecked,
  ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICON_RN, ICON_FIELD_CLEAN } from '../app-settings';

@Component({
  selector: 'app-input-rn',
  template: `<div fxLayout="row" fxLayout.lt-md="column" fxLayoutGap="30px" fxLayoutGap.lt-md="50px">
    <mat-form-field fxFlex [formGroup]="form">
      <mat-label>Registre national</mat-label>

      <button mat-button
        *ngIf="cleanUpField"
        matSuffix
        mat-icon-button aria-label="Clear"
        (click)="cleanUpField=''">
        <mat-icon matTooltip="Effacer">{{iconClean}}</mat-icon>
      </button>

      <input matInput
        required
        #viewRN
        [pattern]="patternRN"
        (keyup)="keyupRN($event)"
        matTooltip="Le numéro d\'identification du registre national"
        #maxRN maxlength="11"
        [(ngModel)]="cleanUpField"
        [formControlName]="'rn'">

      <mat-error [*ngIf]="!notifyStyleRN"> Registre national n'est pas valide. </mat-error>

      <mat-icon matSuffix [style.color]="notifyStyleRN ? '' : 'red'"> {{iconRN}} </mat-icon>
      <mat-hint align="end" style="width: 70px;"> {{maxRN.value.length}} / 11 </mat-hint>

      <mat-hint *ngIf="hint" class="hint-error">
        La valeur doit être numerique.
      </mat-hint>

      <mat-hint *ngIf="!hint">
        Registre national est un identifiant unique et personnel composé de 11 chiffres.
        <span *ngIf="!notifyStyleRN && maxRN.value.length > 0" class="hint-error">
          ( RN n'est pas conforme. )
        </span>
      </mat-hint>

    </mat-form-field></div><div class="div-both"> </div>`
})
export class InputRnComponent implements OnInit, AfterViewInit, AfterViewChecked   {

  @Output() public childMsgRN: EventEmitter<string> = new EventEmitter<string>();
  @Input() public form: FormGroup;
  @Input() showMessageRN: string;
  @ViewChild('viewRN', {static: false}) viewRN: ElementRef;
  @Input() public hint: boolean;
  public notifyStyleRN: boolean;
  public iconRN = ICON_RN;
  public iconClean = ICON_FIELD_CLEAN;
  public patternRN = '^[0-9]{11,11}';
  public cleanUpField = '';

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {
    this.viewRN.nativeElement.focus();
  }

  keyupRN(event: KeyboardEvent): boolean {

    // let date = '^(29(\/|\-)02(\/|\-)(2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26]))))$';
    // date += '|^((0[1-9]|1[0-9]|2[0-8])(\/|\-)02(\/|\-)((19|2[0-9])[0-9]{2}))$';
    // date += '|^((0[1-9]|[12][0-9]|3[01])(\/|\-)(0[13578]|10|12)(\/|\-)((19|2[0-9])[0-9]{2}))$';
    // date += '|^((0[1-9]|[12][0-9]|30)(\/|\-)(0[469]|11)(\/|\-)((19|2[0-9])[0-9]{2}))$';

    const value = (event.target as HTMLInputElement).value;

    this.notifyStyleRN = false;

    if ( !this.validateRn(value ) ) {
      this.notifyStyleRN = false;
      this.childMsgRN.emit('');
      return false;
    } else {
      this.notifyStyleRN = true;
    }

  }

  validateRn(rn): boolean {

    let modulo ;

    let millenaire;
    let annee;
    let mois;
    let jour;
    let sexe;
    let verif;
    let num;

    if (rn.length === 11) {
      annee = rn.substr(0, 2);
      mois = rn.substr(2, 2);
      jour = rn.substr(4, 2);
      sexe = rn.substr(6, 3);

      modulo = annee + mois + jour + sexe;
      modulo = parseInt(modulo, 0);
      verif = rn.substr(9, 2);
      verif = parseInt(verif, 0);

      if (97 - (modulo % 97) !== verif) {
        num = (2 + '' + rn);
        return this.validateRn(parseInt(num, 0));
      }
      else {
        return true;
      }
    }
    else if (rn.length === 12) {
      millenaire = rn.charAt(0);
      annee = rn.substr(1, 2);
      mois = rn.substr(3, 2);
      jour = rn.substr(5, 2);
      sexe = rn.substr(7, 3);

      if (millenaire === '2') {
        modulo = (2 + '' + annee + mois + jour + sexe);
        modulo = parseInt(modulo, 0);
      }
      else {
        modulo = annee + mois + jour + sexe;
      }
      verif = rn.substr(10, 2);
      verif = parseInt(verif, 0);

      if (97 - (modulo % 97) !== verif) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  }

}
