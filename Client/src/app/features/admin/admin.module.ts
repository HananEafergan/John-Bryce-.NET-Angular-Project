import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageRentalsComponent } from './components/manage-rentals/manage-rentals.component';
import { ManageCarsComponent } from './components/manage-cars/manage-cars.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManageBranchesComponent } from './components/manage-branches/manage-branches.component';
import { BranchRowComponent } from './components/manage-branches/components/branch-row/branch-row.component';
import { SharedModule } from '../../shared/shared.module';
import { ManageCarRowComponent } from './components/manage-cars/components/manage-car-row/manage-car-row.component';
import { ManageRentalRowComponent } from './components/manage-rentals/components/manage-rental-row/manage-rental-row.component';
import { ManageUserRowComponent } from './components/manage-users/components/manage-user-row/manage-user-row.component';


@NgModule({
  declarations: [
    ManageRentalsComponent,
    ManageCarsComponent,
    ManageUsersComponent,
    ManageBranchesComponent,
    BranchRowComponent,
    ManageCarRowComponent,
    ManageRentalRowComponent,
    ManageUserRowComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
