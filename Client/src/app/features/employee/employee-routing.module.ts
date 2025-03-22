import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReturnCarComponent } from './components/return-car/return-car.component';

const routes: Routes = [{ path: 'return-car', component: ReturnCarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
