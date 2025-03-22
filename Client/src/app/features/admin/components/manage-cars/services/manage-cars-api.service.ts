import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../../../../environment.prod';
import { Car } from '../../../../../shared/components/car-search/model/car.model';
import { ManageCarsObj } from '../models/manage-cars-obj.mode';

@Injectable()
export class ManageCarsApiService {

  private apiUrl: string = `${environment.apiUrl}/Cars`

  constructor(private readonly http: HttpClient) { }

  getCars() {
    return this.http.get<ManageCarsObj>(`${this.apiUrl}/GetCars`).pipe(catchError(this.handleError));
  }

  updateCar(car: Car) {
    return this.http.post<boolean>(`${this.apiUrl}/UpdateCar`, car).pipe(catchError(this.handleError));
  }

  addCar(car: Car) {
    return this.http.post<boolean>(`${this.apiUrl}/AddCar`, car).pipe(catchError(this.handleError));
  }

  deleteCar(carId: string) {
    return this.http.get<boolean>(`${this.apiUrl}/DeleteCar/${carId}`).pipe(catchError(this.handleError));
  }

  handleError = (error: HttpErrorResponse) => {
    return throwError(() => new Error(error.message));
  }
}
