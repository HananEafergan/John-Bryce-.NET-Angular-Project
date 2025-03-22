import { Component, Input, OnInit } from '@angular/core';
import { Rental } from '../../../../../user/models/rental.model';
import { ManageRentalsStoreService } from '../../services/manage-rentals-store.service';
import { Observable } from 'rxjs';
import { User } from '../../../../../../shared/models/user.model';
import { Car } from '../../../../../../shared/components/car-search/model/car.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-rental-row',
  standalone: false,
  templateUrl: './manage-rental-row.component.html',
  styleUrl: './manage-rental-row.component.scss'
})
export class ManageRentalRowComponent implements OnInit{
  @Input() rental!: Rental;
  users$!: Observable<User[]>;
  cars$!: Observable<Car[]>;
  rentalForm!: FormGroup;
  isEditMode: boolean = false;

  get formControls() {
    return this.rentalForm.controls;
  }


  constructor(private readonly store: ManageRentalsStoreService,
    private readonly fb: FormBuilder
  ) {
  }

  ngOnInit():void{    
    this.users$ = this.store.users$;
    this.cars$ = this.store.cars$;
    this.setForm();
  }

  setForm() {
    this.rentalForm = this.fb.group({
      user: [null, Validators.required],
      car: [null, Validators.required],
      startDate: [null, Validators.required],
      expectedReturnDate: [null, Validators.required],
      actualReturnDate: [null],
      totalCost: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      status: [null, Validators.required]
    });

    this.rentalForm.disable();

    if(this.rental){
      this.setFormDefaultValues();
    }
  }

  setFormDefaultValues() {
    this.formControls['user'].setValue(this.rental?.UserID),
    this.formControls['car'].setValue(this.rental?.CarID),
    this.formControls['startDate'].setValue(this.rental?.StartDate),
    this.formControls['expectedReturnDate'].setValue(this.rental?.ExpectedReturnDate);
    this.formControls['actualReturnDate'].setValue(this.rental?.ActualReturnDate);
    this.formControls['totalCost'].setValue(this.rental?.TotalCost);
    this.formControls['status'].setValue(this.rental?.Status);
  }

  edit(){
    this.isEditMode = true;
    this.rentalForm.enable();
  }

  cancel(){
    this.isEditMode = false;
    this.setFormDefaultValues();
    this.rentalForm.disable();
  }

  save(){
    if(this.rentalForm.invalid){
      return;
    }

    this.rental.UserID = this.formControls['user'].value;
    this.rental.CarID = this.formControls['car'].value;
    this.rental.StartDate = this.formControls['startDate'].value;
    this.rental.ExpectedReturnDate = this.formControls['expectedReturnDate'].value;
    this.rental.ActualReturnDate = this.formControls['actualReturnDate'].value;
    this.rental.TotalCost = this.formControls['totalCost'].value;
    this.rental.Status = this.formControls['status'].value;

    this.store.updateRental(this.rental);
    this.rentalForm.disable();
  }

  remove(){
    this.store.deleteRental(this.rental.RentalID!);
  }
}
