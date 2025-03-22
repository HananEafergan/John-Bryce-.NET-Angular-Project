import { Component } from '@angular/core';
import { UserApiService } from '../../services/user-api.service';
import { UserStoreService } from '../../services/user-store.service';
import { Observable } from 'rxjs';
import { Rental } from '../../models/rental.model';

@Component({
  selector: 'app-rental-history',
  standalone: false,
  templateUrl: './rental-history.component.html',
  styleUrl: './rental-history.component.scss',
  providers: [UserApiService, UserStoreService]
})
export class RentalHistoryComponent {
  userRentalHistory$!: Observable<Rental[]>;
  constructor(private readonly store: UserStoreService) { 
    this.userRentalHistory$ = this.store.rentalsHistory$;
    this.getRentalHistory();
   }

  getRentalHistory(){
    const userId:number = +localStorage.getItem('userId')!;
    this.store.getRentalHistory(userId);
  }

}
