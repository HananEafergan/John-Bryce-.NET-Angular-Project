import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageBranchesComponent } from './components/manage-branches/manage-branches.component';
import { ManageCarsComponent } from './components/manage-cars/manage-cars.component';
import { ManageRentalsComponent } from './components/manage-rentals/manage-rentals.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AuthGuard } from '../../guards/guards/auth.guard';

const routes: Routes =
  [{ path: 'manage-branches', component: ManageBranchesComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'manage-cars', component: ManageCarsComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'manage-rentals', component: ManageRentalsComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard], data: { role: 'Admin' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
