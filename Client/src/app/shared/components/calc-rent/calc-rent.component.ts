import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject, take, tap } from 'rxjs';
import { UserApiService } from '../../../features/user/services/user-api.service';
import { UserStoreService } from '../../../features/user/services/user-store.service';
import { Rental } from '../../../features/user/models/rental.model';
import { GlobalFuncService } from '../../services/global-func.service';

@Component({
  selector: 'app-calc-rent',
  standalone: false,
  templateUrl: './calc-rent.component.html',
  styleUrl: './calc-rent.component.scss',
  providers: [UserApiService, UserStoreService]
})
export class CalcRentComponent {
  calcForm!: FormGroup;
  overallPrice!: number;
  lateFee!: number;
  today: Date = new Date();
  err$!: Observable<string>;

  constructor(private readonly fb: FormBuilder,
    private readonly store: UserStoreService,
    private readonly funcService: GlobalFuncService,
    public dialogRef: MatDialogRef<CalcRentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.setForm();
    this.err$ = this.store.error$;
    this.store.orderPlaced$.pipe(take(1),tap(()=>{
      this.closeDialog()
    })).subscribe();
  }

  setForm(): void {
    this.calcForm = this.fb.group({
      startDate: [new Date(), [Validators.required]],
      endDate: [null, [Validators.required]]
    });
  }

  calculateRentPrice() {
    this.overallPrice = this.funcService.calculateRentPrice(
      this.calcForm.controls['startDate'].value,
      this.calcForm.controls['endDate'].value,
      this.data?.dailyRate
    );
    
    this.lateFee = this.data?.lateFee
  }

  orderNow() {
    if (localStorage.getItem('role') != 'User' || !localStorage.getItem('userId')) {
      this.store.setError('Oops! You have to be logged in to make an order.')
    }
    else if(this.data?.isAvailable == false){
      this.store.setError('Sorry! The car you have selected is not available for rent.')
    }
    else {
      const rental: Rental ={
        UserID: +localStorage.getItem('userId')!,
        CarID: this.data?.carId,
        StartDate: this.calcForm.controls['startDate'].value,
        ExpectedReturnDate: this.calcForm.controls['endDate'].value,
        TotalCost: this.overallPrice,
        Status: 'Active'
      };
      this.store.rentCar(rental)
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}