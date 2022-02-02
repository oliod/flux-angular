import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import { AppSettings } from '../app-settings';

@Injectable()
export class RequestService {

  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);

  constructor(private http: HttpClient) { }

  public handleTheRequest(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      delay(this.timing()),
      catchError(err => throwError(err)),
      catchError(err => of(err)),
      map((x) => {
        return x;
      } )
    );
  }

  private timing(): number | Date {
    return AppSettings.TIMING;
  }

}
