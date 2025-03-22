import { Injectable } from '@angular/core';
import { Rental } from '../../user/models/rental.model';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environment.prod';

@Injectable()
export class EmployeeApiService {
private apiUrl: string = `${environment.apiUrl}/Employee`

  constructor(private readonly http: HttpClient) { }

  getRentals() {
    return this.http.get<Rental[]>(`${this.apiUrl}/GetRentals`).pipe(catchError(this.handleError));
  }

  returnCar(rental: Rental) {
    return this.http.post<boolean>(`${this.apiUrl}/ReturnCar`, rental).pipe(catchError(this.handleError));
  }

  handleError = (error: HttpErrorResponse) => {
    return throwError(() => new Error(error.message));
  }
}
