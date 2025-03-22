import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, take, tap } from 'rxjs';
import { Rental } from '../../user/models/rental.model';
import { EmployeeApiService } from './employee-api.service';

@Injectable()
export class EmployeeStoreService {

  private rentalsSubject: BehaviorSubject<Rental[]> = new BehaviorSubject<Rental[]>([]);
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get rentals$() {
    return this.rentalsSubject.asObservable();
  }

  get error$() {
    return this.errorSubject.asObservable();
  }

  setRentals(value: Rental[]) {
    this.rentalsSubject.next(value);
  }

  setError(value: string) {
    this.errorSubject.next(value);
  }
  constructor(private readonly apiService: EmployeeApiService) { }

  getRentals() {
    this.apiService.getRentals().pipe(take(1), tap(res =>
      this.setRentals(res)), catchError(err => {
        this.setError(err);
        return of([]);
      })
    ).subscribe();
  }

  returnCar(rental: Rental) {
    rental.ActualReturnDate = new Date();
    rental.Status = 'Returned';
    this.apiService.returnCar(rental).pipe(take(1), tap(res =>
      this.getRentals()), catchError(err => {
        this.setError(err);
        return of([]);
      })
    ).subscribe()
  }
}
