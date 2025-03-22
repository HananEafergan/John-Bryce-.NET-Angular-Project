import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { RentalHistoryComponent } from './components/rental-history/rental-history.component';
import { UserApiService } from './services/user-api.service';

@NgModule({
  declarations: [
    RentCarComponent,
    RentalHistoryComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
  ],    
    providers:[UserApiService]
})
export class UserModule { }