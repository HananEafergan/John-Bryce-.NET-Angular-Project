import { Injectable } from '@angular/core';
import { Rental } from '../../../../user/models/rental.model';
import { ManageRentalsObj } from '../models/mange-rental-obj.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../../../../environments';

@Injectable()
export class ManageRentalsApiService {

  private apiUrl: string = `${environment.apiUrl}/ManageRentals`

  constructor(private readonly http: HttpClient) { }

  getRentals() {
    return this.http.get<ManageRentalsObj>(`${this.apiUrl}/GetRentals`).pipe(catchError(this.handleError));
  }

  updateRental(rental: Rental) {
    return this.http.post<boolean>(`${this.apiUrl}/UpdateRental`, rental).pipe(catchError(this.handleError));
  }

  deleteRental(rentalId: number) {
    return this.http.get<boolean>(`${this.apiUrl}/DeleteRental/${rentalId}`).pipe(catchError(this.handleError));
  }

  handleError = (error: HttpErrorResponse) => {
    return throwError(() => new Error(error.message));
  }
}
