import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { PaymentService } from 'src/app/services/payment.service';
import { Booked, PaymentConfirm, PaymentIntent } from 'src/app/shared/models/payment-model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  bookingForm: FormGroup;
  stripeTest: FormGroup;

  isEditable = false;

  successMessage: string = "Wait..."

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  booked: Booked;
  bookedConfirmId: string;

  constructor(private fb: FormBuilder, 
              private stripeService: StripeService,
              private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.booked = this.paymentService.getBooked();
    this.initForm();
  }

  initForm(){

    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    })

    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    })

    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });

  }

  cancel(){
    this.paymentService.cancel(this.bookedConfirmId).subscribe((data: any) => {
      const info = "Reservation successfully canceled";
      this.successMessage = ""
    })
  }

  confirm(){
    const paymentConfirm: PaymentConfirm = {
      email: this.booked.email,
      locator : this.booked.locator,
      name : this.booked.name,
      paymentId : this.bookedConfirmId
    }

    this.paymentService.confirm(paymentConfirm).subscribe((data: any) => {
      const info = "Reservation successfully confirmed";
      this.successMessage = info
    })
  }

  buy(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.getCard(), { name })
      .subscribe((result) => {
        if (result.token) {

          // Use the token
          console.log(result.token.id);

          const paymentIntent: PaymentIntent = {
            description: this.booked.name + ': ' + this.booked.locator,
            price: this.booked.price
          }

          this.executeIntent(paymentIntent);

        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  executeIntent(payment: PaymentIntent) {
    this.paymentService.buy(payment).subscribe((result: any) => this.bookedConfirmId = result.id)
  }

}
