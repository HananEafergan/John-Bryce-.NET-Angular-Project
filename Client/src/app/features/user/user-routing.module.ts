import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentalHistoryComponent } from './components/rental-history/rental-history.component';

const routes: Routes = [{ path: 'rental-history', component: RentalHistoryComponent, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
