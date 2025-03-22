import { Injectable } from '@angular/core';
import { CarsApiService } from './cars-api.service';
import { Car } from '../model/car.model';
import { BehaviorSubject, catchError, map, of, take, tap } from 'rxjs';
import { GlobalFuncService } from '../../../services/global-func.service';

@Injectable()
export class CarsStoreService {
  private origCarsSubject: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
  private carsSubject: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private likedCarsSubject: BehaviorSubject<Car[]> = new BehaviorSubject<Car[]>([]);

  get Error$() {
    return this.errorSubject.asObservable();
  }

  get cars$() {
    return this.carsSubject.asObservable();
  }

  get likedCars$() {
    return this.likedCarsSubject.asObservable();
  }

  setCars(value: Car[]) {
    this.origCarsSubject.next(value);
    this.carsSubject.next(value);
  }

  setFilteredCars(value: Car[]) {
    this.carsSubject.next(value);
  }

  setError(value: string) {
    this.errorSubject.next(value);
  }

  setLikedCars(value: Car[]) {
    this.likedCarsSubject.next(value);
  }

  constructor(private readonly apiService: CarsApiService, private readonly funcService: GlobalFuncService) { }

  getCars() {
    this.apiService.getCars().pipe(take(1), tap(res =>
      this.setCars(res.cars)), catchError(err => {
        this.setError(err);
        return of([]);
      })
    ).subscribe();
  }

  filterByField(value: string, field: string) {
    switch (field) {
      case 'GearType':
        this.setFilteredCars(this.origCarsSubject.value.filter(c => c.CarType.GearType.toLowerCase().includes(value.toLowerCase())));
        break;
      case 'YearOfManufacture':
        this.setFilteredCars(this.origCarsSubject.value.filter(c => `${c.CarType.YearOfManufacture}`.includes(value)));
        break;
      case 'Model':
        this.setFilteredCars(this.origCarsSubject.value.filter(c => c.CarType.Model.toLowerCase().includes(value.toLowerCase())));
        break;
      case 'Manufacturer':
        this.setFilteredCars(this.origCarsSubject.value.filter(c => c.CarType.Manufacturer.toLowerCase().includes(value.toLowerCase())));
        break;
    }
  }

  filterCars(value: string) {
    this.setFilteredCars(this.funcService.filterArray(this.origCarsSubject.value, value, 'Image'));
  }

  saveLikedCar(carId: number) {

    let savedCarIds: number[] = JSON.parse(localStorage.getItem('savedCarIds') || '[]');

    if (!savedCarIds.includes(carId)) {
      savedCarIds.push(carId);
      localStorage.setItem('savedCarIds', JSON.stringify(savedCarIds));
    }

    this.setLikedCars(this.origCarsSubject.value.filter(c => savedCarIds.includes(+c.CarID) ));
  }
}
