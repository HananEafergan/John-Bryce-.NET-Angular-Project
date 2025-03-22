import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Car } from '../model/car.model';
import { environment } from '../../../../../environment.prod';
import { ManageCarsObj } from '../../../../features/admin/components/manage-cars/models/manage-cars-obj.mode';

@Injectable()
export class CarsApiService {
  private apiUrl: string = `${environment.apiUrl}/Cars`

  constructor(private readonly http: HttpClient) { }

  getCars() {
    return this.http.get<ManageCarsObj>(`${this.apiUrl}/GetCars`).pipe(catchError(this.handleError));
  }

  handleError = (error: HttpErrorResponse) => {
    return throwError(() => new Error(error.message));
  }
}
