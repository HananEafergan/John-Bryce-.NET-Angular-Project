import { Injectable } from '@angular/core';
import { BehaviorSubject, take, tap, catchError, of } from 'rxjs';
import { Car } from '../../../../../shared/components/car-search/model/car.model';
import { User } from '../../../../../shared/models/user.model';
import { Rental } from '../../../../user/models/rental.model';
import { Branch } from '../../manage-branches/model/branch.model';
import { ManageCarsApiService } from '../../manage-cars/services/manage-cars-api.service';
import { ManageRentalsApiService } from './manage-rentals-api.service';

@Injectable()
export class ManageRentalsStoreService {

  private carsSubject: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
  private rentalsSubject: BehaviorSubject<Rental[]> = new BehaviorSubject<Rental[]>([]);
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get cars$() {
    return this.carsSubject.asObservable();
  }

  get rentals$() {
    return this.rentalsSubject.asObservable();

  }

  get users$() {
    return this.usersSubject.asObservable();

  }

  get error$() {
    return this.errorSubject.asObservable();
  }

  setCars(value: Car[]) {
    this.carsSubject.next(value);
  }

  setUsers(value: User[]) {
    this.usersSubject.next(value);
  }

  setRentals(value: Rental[]) {
    this.rentalsSubject.next(value);
  }

  setError(value: string) {
    this.errorSubject.next(value);
  }

  constructor(private readonly apiService: ManageRentalsApiService) { }

  getRentals() {
    this.apiService.getRentals().pipe(take(1), tap(res => {
      this.setCars(res.Cars);
      this.setUsers(res.Users);
      this.setRentals(res.Rentals);
    }), catchError(err => {
      this.setError(err);
      return of([]);
    })
    ).subscribe();
  }

  updateRental(rental: Rental) {
    this.apiService.updateRental(rental).pipe(take(1), tap(res => {
      if (res == true) {
        this.getRentals();
      }
      else {
        this.setError('An error occured while updating rental entry');
      }
    }), catchError(err => {
      this.setError(err);
      return of([]);
    })
    ).subscribe();
  }

  deleteRental(rentalId: number) {
    this.apiService.deleteRental(rentalId).pipe(take(1), tap(res => {
      if (res == true) {
        this.getRentals();
      }
      else {
        this.setError('An error occured while deleting rental entry');
      }
    }), catchError(err => {
      this.setError(err);
      return of([]);
    })
    ).subscribe();
  }
}