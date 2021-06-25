import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booked, PaymentConfirm, PaymentIntent } from '../shared/models/payment-model';



@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private booked: Booked;
  private API = "http://localhost:8080/booking-restaurant/v1/payment/";

  constructor(private http: HttpClient) { }

  setBooked(booked: Booked){
    this.booked = booked;
  }

  getBooked(){
    return this.booked;
  }

  buy(payment: PaymentIntent){

    return this.http.post(this.API + 'paymentIntent', payment)
  }

  cancel(paymentId: string){
    return this.http.post( this.API + 'cancel/'+paymentId, {})
  }

  confirm(payment: PaymentConfirm){
    return this.http.post( this.API + 'confirm', payment)
  }
}
