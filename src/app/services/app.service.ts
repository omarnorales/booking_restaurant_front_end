import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Booking } from '../shared/models/booking-models';
import { LightRestaurant } from '../shared/models/restaurant-light-model';


const API = "http://localhost:8080/booking-restaurant/v1/";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  

  constructor(private http: HttpClient) { }

  getAllRestaurants(){
    return this.http.get( API + "restaurants" );
  }

  getAllRestaurantsMock(){
    
    const restaurants: LightRestaurant[] = [];

    const restaurant = new LightRestaurant();
    restaurant.address = 'Trinity Ave.';
    restaurant.id = 1;
    restaurant.image = 'https://www.exquisitoperu.com/wp-content/uploads/2019/03/mayta.jpg';
    restaurant.name = 'Pollitos Fela';

    const restaurant2: LightRestaurant ={
      address: '3dr Ave.',
      id: 2,
      image: 'https://villagrouploreto.s3.amazonaws.com/uploads/restaurant/cover/50/optimizada_main-hotel-santafe-restaurante-casa-mia.jpg',
      name:'La parrillada de Alexis'
    }

    restaurants.push(restaurant,restaurant2);

    return of(restaurants)

  }

  getRestaurantById(restairantId: number){

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get( `${API}restaurant/${restairantId}`, options );
  }

  createReservation(booking: Booking){
    return this.http.post( API + "reservation", booking );
  }

  cancelReservation(codeReservation: string){

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.delete( `${API}deleteReservation?locator=${codeReservation}`, options);
  }
}
