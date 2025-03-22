import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments';
import { catchError, throwError } from 'rxjs';
import { Rental } from '../models/rental.model';

@Injectable()
export class UserApiService {
  private apiUrl: string = `${environment.apiUrl}/User`

  constructor(private readonly http: HttpClient) { }

  rentCar(rental: Rental) {
    return this.http.post<boolean>(`${this.apiUrl}/RentCar`, rental).pipe(catchError(this.handleError));
  }

  getUserRentals(userId: number) {
    return this.http.get<Rental[]>(`${this.apiUrl}/GetUserRentals/${userId}`).pipe(catchError(this.handleError));
  }

  handleError = (error: HttpErrorResponse) => {
    return throwError(() => new Error(error.message));
  }
}
