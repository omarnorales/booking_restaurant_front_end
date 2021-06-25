import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { PaymemntService } from 'src/app/services/payment.service';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';
import { Booking } from 'src/app/shared/models/booking-models';
import { Restaurant } from 'src/app/shared/models/restaurant-model';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  bookingForm;
  booking = new Booking();

  @Input() restaurant: Restaurant;
  //private idRestaurant: number;

  constructor(private fb: FormBuilder,
              private service: AppService,
              private paymentService: PaymemntService,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {

    this.initForm();
  }

  initForm(){

    this.bookingForm = this.fb.group({
      
      name: ['', Validators.required],
      email: ['', Validators.required],
      date: [new Date(), Validators.required],
      time: ['', Validators.required],
      customers: ['', Validators.required],

    })

  }

  setBooking(){
    this.booking.restaurantId = this.restaurant.id;
    this.booking.name = this.bookingForm.get('name').value;
    this.booking.email = this.bookingForm.get('email').value;
    this.booking.turnId = this.bookingForm.get('time').value;
    this.booking.date = this.bookingForm.get('date').value;
    this.booking.person = this.bookingForm.get('customers').value;
    this.booking.price = this.restaurant.price;

    console.log(this.restaurant, this.booking);
  }

  sendBooking(){

    this.setBooking();
    this.service.createReservation(this.booking).subscribe( (result: any) => {
      const title = `Reservation code: ${result.data}`;
      const info = "Code will be neccessary to cancel or access reservation details, please keep it in a safe plase";
      this.openDialog(title, info);
    })

  }

  payBooking(){
    this.setBooking();
    this.service.createReservation(this.booking).subscribe( (result: any) => {
      this.paymentService.setBooked({ ...this.booking, locator: result.data})
      this.router.navigate(['payment'])
    })
  }

  openDialog( title: string, info: string): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '350px',
      data: {title: title, info: info}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  


}
