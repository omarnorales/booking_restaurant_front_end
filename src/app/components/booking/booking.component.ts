import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Booking } from 'src/app/shared/models/booking-models';
import { Restaurant } from 'src/app/shared/models/restaurant-model';
import { InfoDialogComponent } from '../../shared/dialogs/info-dialog/info-dialog.component';
import { BookingFormComponent } from './booking-form/booking-form.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

@ViewChild(BookingFormComponent) bookingForm: BookingFormComponent;

  restaurant: Restaurant = new Restaurant();
  private idRestaurant: number;

  imageUrl: string;
  loading: boolean;
  public backgroundImg: SafeStyle;

  constructor(private service: AppService,
              private activatedRoute: ActivatedRoute,
              private sanitizer:DomSanitizer) {
                
         
  }

  ngOnInit(): void {

    this.loading = true;

    this.idRestaurant = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getRestaurantById();

  }


  getBackgroundStyles() {
    console.log('getBackgroundStyles()');
    let myStyles = {
      //'background-image': 'url(' + this.sanitize(this.restaurant.image) + ')' 
      'background-image': 'url(' + this.restaurant.image + ' | async)' 
    };
    return myStyles;
  }
  
  sanitize(imgURL) { 
    return this.sanitizer.bypassSecurityTrustUrl(imgURL);
  }

  setRestaurant(restaurant: Restaurant){
    this.restaurant = restaurant;
  }

  getRestaurantById(){
    
    
    this.service.getRestaurantById(this.idRestaurant).subscribe((result: any) => {
      
      this.imageUrl = result.data.image

      //this.bookingForm.restaurant = result.data
      this.restaurant = result.data

      this.loading = false;
  })
}



}
