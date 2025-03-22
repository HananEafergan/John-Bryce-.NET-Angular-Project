import { Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { Rental } from '../models/rental.model';
import { Subject, take, tap, catchError, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserStoreService {
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private rentalsHistorySubject: BehaviorSubject<Rental[]> = new BehaviorSubject<Rental[]>([]);
  private orderPlacedSubject: Subject<boolean> = new Subject<boolean>();

  get error$() {
    return this.errorSubject.asObservable();
  }

  get rentalsHistory$() {
    return this.rentalsHistorySubject.asObservable();
  }

  get orderPlaced$() {
    return this.orderPlacedSubject.asObservable();
  }

  setError(value: string) {
    this.errorSubject.next(value);
  }

  setRentalsHistory(value: Rental[]) {
    this.rentalsHistorySubject.next(value);
  }

  setOrderPlaced(value: boolean) {
    this.orderPlacedSubject.next(value);
  }


  constructor(private readonly apiService: UserApiService, private router: Router) { }

  rentCar(rental: Rental) {
    this.apiService.rentCar(rental).pipe(take(1), tap(() => {
      this.setOrderPlaced(true);
      this.router.navigate(['/user/rental-history']);
    }), catchError(err => {
      this.setError(err);
      return of([]);
    })
    ).subscribe();
  }

  getRentalHistory(userId: number) {
    this.apiService.getUserRentals(userId).pipe(take(1), tap(res =>
      this.setRentalsHistory(res)), catchError(err => {
        this.setError(err);
        return of([]);
      })
    ).subscribe();
  }
}