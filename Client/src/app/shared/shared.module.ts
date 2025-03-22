import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MaterialModule } from './material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { provideHttpClient } from '@angular/common/http';
import { PicUploadComponent } from './components/pic-upload/pic-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { GlobalFuncService } from './services/global-func.service';
import { CalcRentComponent } from './components/calc-rent/calc-rent.component';
import { CarSearchComponent } from './components/car-search/car-search.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';



@NgModule({
  declarations: [
    SideMenuComponent,
    FooterComponent,
    HeaderComponent,
    PicUploadComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    CalcRentComponent,
    CarSearchComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SideMenuComponent,
    MaterialModule,
    FooterComponent,
    HeaderComponent,
    PicUploadComponent,
    FormsModule,
    ReactiveFormsModule,
    CarSearchComponent,
    UnauthorizedComponent,
    NotFoundComponent
  ],
  providers: [provideHttpClient(), GlobalFuncService]
})
export class SharedModule { }
