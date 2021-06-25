import { Injectable } from '@angular/core';
import { Booked } from '../shared/models/payment-model';

@Injectable({
  providedIn: 'root'
})
export class PaymemntService {

  private booked: Booked;

  constructor() { }

  setBooked(booked: Booked){
    this.booked = booked;
  }

  getBooked(){
    return this.booked;
  }
}