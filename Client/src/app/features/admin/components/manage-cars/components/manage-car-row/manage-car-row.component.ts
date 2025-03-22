import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from '../../../../../../shared/components/car-search/model/car.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageCarsStoreService } from '../../services/manage-cars-store.service';
import { Observable, take, tap } from 'rxjs';
import { Branch } from '../../../manage-branches/model/branch.model';

@Component({
  selector: 'app-manage-car-row',
  standalone: false,
  templateUrl: './manage-car-row.component.html',
  styleUrls: ['./manage-car-row.component.scss']
})
export class ManageCarRowComponent implements OnInit {
  @Input() car!: Car;
  @Output() toggleNewCar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() addCar: boolean = false;
  isEditMode: boolean = false;
  carForm!: FormGroup;
  branches$!: Observable<Branch[]>;

  get formControls() {
    return this.carForm.controls;
  }

  constructor(private readonly fb: FormBuilder, private readonly store: ManageCarsStoreService) {
    this.store.cars$.pipe(tap(() => {
      if (this.addCar) {
        this.toggleNewCar.emit(true);
      }
    }))
  }

  ngOnInit(): void {
    this.branches$ = this.store.branches$;
    this.setForm();
  }

  setForm() {
    this.carForm = this.fb.group({
      licensePlate: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{1,7}$/)]],
      manufacturer: [null, Validators.required],
      model: [null, Validators.required],
      year: [null, [Validators.required, Validators.pattern(/^\d{4}$/)]],
      milage: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      dailyRate: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      lateReturnFee: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      gearType: [null, Validators.required],
      isAvailable: [null, Validators.required],
      isOperational: [null],
      branch: [null],
      image: [null]
    });

    if (this.car) {
      this.setFormDefaultValues();
      this.carForm.disable();
    }
    else {
      this.edit();
    }
  }

  setFormDefaultValues() {
    this.formControls['licensePlate'].setValue(this.car.LicensePlate, { emitEvent: false })
    this.formControls['manufacturer'].setValue(this.car.CarType.Manufacturer, { emitEvent: false })
    this.formControls['model'].setValue(this.car.CarType.Model, { emitEvent: false })
    this.formControls['year'].setValue(this.car.CarType.YearOfManufacture, { emitEvent: false })
    this.formControls['milage'].setValue(this.car.CurrentMileage, { emitEvent: false })
    this.formControls['dailyRate'].setValue(this.car.CarType.DailyRate, { emitEvent: false })
    this.formControls['lateReturnFee'].setValue(this.car.CarType.LateReturnFee, { emitEvent: false })
    this.formControls['gearType'].setValue(this.car.CarType.GearType, { emitEvent: false })
    this.formControls['isAvailable'].setValue(this.car.IsAvailable, { emitEvent: false })
    this.formControls['isOperational'].setValue(this.car.IsOperational, { emitEvent: false })
    this.formControls['branch'].setValue(this.car.BranchID, { emitEvent: false })
    this.formControls['image'].setValue(this.car.Image, { emitEvent: false })
  }

  edit() {
    this.isEditMode = true;
    this.carForm.enable();
  }

  saveFormToObj() {
    this.car = {
      CarID: this.car ? this.car.CarID : '',
      LicensePlate: this.formControls['licensePlate'].value,
      CurrentMileage: this.formControls['milage'].value,
      IsAvailable: this.formControls['isAvailable'].value,
      IsOperational: this.formControls['isOperational'].value,
      BranchID: this.formControls['branch'].value,
      Image: this.formControls['image'].value,
      TypeID: this.car ? this.car.TypeID : '',
      CarType: {
        TypeID: this.car?.TypeID,
        Manufacturer: this.formControls['manufacturer'].value,
        Model: this.formControls['model'].value,
        YearOfManufacture: this.formControls['year'].value,
        LateReturnFee: this.formControls['lateReturnFee'].value,
        DailyRate: this.formControls['dailyRate'].value,
        GearType: this.formControls['gearType'].value
      },
      Branch: this.car ? this.car.Branch : {
        BranchID: '',
        Name: '',
        Address: '',
        Latitude: '',
        Longitude: ''
      }
    }
  }

  setPicValue(value: string) {
    this.formControls['image'].setValue(value, { emitEvent: false })
  }

  save() {
    if (this.carForm.invalid) {
      return;
    }
    this.saveFormToObj();
    this.addCar ? this.store.addCar(this.car) : this.store.updateCar(this.car);
  }

  remove() {
    this.store.deleteCar(this.car.CarID);
  }

  cancel() {
    if (this.addCar) {
      this.toggleNewCar.emit(true);
    }
    else {
      this.carForm.disable();
      this.isEditMode = false;
      this.setFormDefaultValues();
    }
  }
}