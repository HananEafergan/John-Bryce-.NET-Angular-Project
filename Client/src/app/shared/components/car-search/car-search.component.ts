import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarsApiService } from './services/cars-api.service';
import { CarsStoreService } from './services/cars-store.service';
import { Car } from './model/car.model';
import { MatDialog } from '@angular/material/dialog';
import { CalcRentComponent } from '../calc-rent/calc-rent.component';

@Component({
  selector: 'app-car-search',
  standalone: false,
  templateUrl: './car-search.component.html',
  styleUrl: './car-search.component.scss',
  providers: [CarsApiService, CarsStoreService]
})
export class CarSearchComponent implements OnInit {
  cars$!: Observable<Car[]>;
  likedCars$!: Observable<Car[]>;
  error$!: Observable<string>;
  today: Date = new Date();

  constructor(private readonly store: CarsStoreService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.cars$ = this.store.cars$;
    this.likedCars$ = this.store.likedCars$;
    this.store.getCars();
  }

  filterCarArr(value: string) {
    this.store.filterCars(value);
  }

  openCarRentCalculation(car: Car) {
    this.store.saveLikedCar(+car.CarID);
    this.dialog.open(CalcRentComponent, {
      data: {
        dailyRate: car.CarType.DailyRate,
        lateFee: car.CarType.LateReturnFee,
        carId: car.CarID,
        isAvailable: car.IsAvailable
      }
    });
  }

  filterByField(value: string, field: string) {
    this.store.filterByField(value, field);
  }
}