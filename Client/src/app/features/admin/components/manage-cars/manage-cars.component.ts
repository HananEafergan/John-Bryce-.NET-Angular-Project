import { Component } from '@angular/core';
import { ManageCarsApiService } from './services/manage-cars-api.service';
import { ManageCarsStoreService } from './services/manage-cars-store.service';
import { Observable, tap } from 'rxjs';
import { Car } from '../../../../shared/components/car-search/model/car.model';

@Component({
  selector: 'app-manage-cars',
  standalone: false,
  templateUrl: './manage-cars.component.html',
  styleUrl: './manage-cars.component.scss',
  providers: [ManageCarsApiService, ManageCarsStoreService]
})
export class ManageCarsComponent {
  cars$!: Observable<Car[]>;
  error$!: Observable<string>;
  isAddNewCar: boolean = false;


  constructor(private readonly store: ManageCarsStoreService) {
    this.cars$ = this.store.cars$.pipe(tap(x => this.isAddNewCar = false));
    this.error$ = this.store.error$;
    this.store.getCars();
  }

  saveCar(car: any) {
    car.editing = false;
  }

  cancelEdit() {
    this.store.getCars();
  }

  toggleNewCar(){
    this.isAddNewCar = !this.isAddNewCar
  }
}