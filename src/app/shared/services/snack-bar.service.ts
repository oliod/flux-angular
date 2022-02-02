import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar(dmessage: string, dicon: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 500000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: { message: dmessage, icon: dicon }
    });
  }
}
