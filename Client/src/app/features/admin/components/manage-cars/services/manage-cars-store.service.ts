import { Injectable } from '@angular/core';
import { ManageCarsApiService } from './manage-cars-api.service';
import { BehaviorSubject, catchError, of, take, tap } from 'rxjs';
import { Car } from '../../../../../shared/components/car-search/model/car.model';
import { Branch } from '../../manage-branches/model/branch.model';

@Injectable()
export class ManageCarsStoreService {
  private carsSubject: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
  private branchesSubject: BehaviorSubject<Branch[]> = new BehaviorSubject<Branch[]>([]);
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get cars$() {
    return this.carsSubject.asObservable();
  }

  get error$() {
    return this.errorSubject.asObservable();
  }
  get branches$() {
    return this.branchesSubject.asObservable();
  }

  setCars(value: Car[]) {
    this.carsSubject.next(value);
  }

  setError(value: string) {
    this.errorSubject.next(value);
  }

  setBranches(value: Branch[]) {
    this.branchesSubject.next(value);
  }
  constructor(private readonly apiService: ManageCarsApiService) { }

  getCars() {
    this.apiService.getCars().pipe(take(1), tap(res => {
      this.setCars(res.cars);
      this.setBranches(res.branches);
    }), catchError(err => {
      this.setError(err);
      return of([]);
    })
    ).subscribe();
  }

  updateCar(car: Car) {
    this.apiService.updateCar(car).pipe(take(1), tap(res => {
      if (res == true) {
        this.getCars();
      }
      else {
        this.setError('An error occured while updating car entry');
      }
    }), catchError(err => {
      this.setError(err);
      return of([]);
    })
    ).subscribe();
  }

  addCar(car: Car) {
    this.apiService.addCar(car).pipe(take(1), tap(res => {
      if (res == true) {
        this.getCars();
      }
      else {
        this.setError('An error occured while adding car entry');
      }
    }), catchError(err => {
      this.setError(err);
      return of([]);
    })
    ).subscribe();
  }

  deleteCar(carId: string) {
    this.apiService.deleteCar(carId).pipe(take(1), tap(res => {
      if (res == true) {
        this.getCars();
      }
      else {
        this.setError('An error occured while deleting car entry');
      }
    }), catchError(err => {
      this.setError(err);
      return of([]);
    })
    ).subscribe();
  }
}
