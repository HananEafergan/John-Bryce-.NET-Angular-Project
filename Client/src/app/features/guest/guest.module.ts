import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    SharedModule
  ]
})
export class GuestModule { }
