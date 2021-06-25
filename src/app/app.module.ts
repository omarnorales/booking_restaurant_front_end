import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingComponent } from './components/booking/booking.component';
import { ExploreComponent } from './components/explore/explore.component';
import { CancelBookingComponent } from './components/cancel-booking/cancel-booking.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { NoimagePipe } from './pipes/noimage.pipe';
import { InfoDialogComponent } from './shared/dialogs/info-dialog/info-dialog.component';
import { BookingFormComponent } from './components/booking/booking-form/booking-form.component';
import { PaymentComponent } from './components/payment/payment.component';


@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    ExploreComponent,
    CancelBookingComponent,
    HeaderComponent,
    DomseguroPipe,
    NoimagePipe,
    InfoDialogComponent,
    BookingFormComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
