import { Component } from '@angular/core';
import { ManageRentalsApiService } from './services/manage-rentals-api.service';
import { ManageRentalsStoreService } from './services/manage-rentals-store.service';
import { Observable } from 'rxjs';
import { Rental } from '../../../user/models/rental.model';

@Component({
  selector: 'app-manage-rentals',
  standalone: false,
  templateUrl: './manage-rentals.component.html',
  styleUrl: './manage-rentals.component.scss',
  providers: [ManageRentalsApiService, ManageRentalsStoreService]
})
export class ManageRentalsComponent {
  rentals$!: Observable<Rental[]>;
  error$!: Observable<string>;

  constructor(private readonly store: ManageRentalsStoreService) {
    this.rentals$ = this.store.rentals$;
    this.error$ = this.store.error$;
    this.store.getRentals();
  }
}
