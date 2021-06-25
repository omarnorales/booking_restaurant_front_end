import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  bookingForm: FormGroup;

  isEditable = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){

    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    })

    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    })

  }

  cancel(){
    console.log("cancel");
  }

  confirm(){
    console.log("Confirm");
  }

}
