import { Component } from '@angular/core';
import { EmployeeApiService } from '../../services/employee-api.service';
import { EmployeeStoreService } from '../../services/employee-store.service';
import { Observable } from 'rxjs';
import { Rental } from '../../../user/models/rental.model';
import { GlobalFuncService } from '../../../../shared/services/global-func.service';

@Component({
  selector: 'app-return-car',
  standalone: false,
  templateUrl: './return-car.component.html',
  styleUrl: './return-car.component.scss',
  providers:[EmployeeApiService, EmployeeStoreService]
})
export class ReturnCarComponent {
  rentalHistory$!: Observable<Rental[]>;

  constructor(private readonly store: EmployeeStoreService,
    private readonly funcService: GlobalFuncService
  ) {    
    this.rentalHistory$ = this.store.rentals$;
    this.store.getRentals();
  }

  returnCar(rental: Rental){
    const expectedReturn = new Date(rental.ExpectedReturnDate).setHours(0,0,0,0);
    const actualReturn = new Date().setHours(0,0,0,0);
    

    if(actualReturn > expectedReturn){
      const lateFee = this.funcService.calculateRentPrice(rental.ExpectedReturnDate, new Date(), rental.Car?.CarType?.LateReturnFee!)
      const newTotalCost = rental.TotalCost + lateFee;
      
      if (confirm(`The total price including late return fee is ${newTotalCost}`)) {
        rental.TotalCost = newTotalCost;
        this.store.returnCar(rental);
      }
      else{
        return;
      }
    }
    else{
      this.store.returnCar(rental);
    }  
  }    
}
