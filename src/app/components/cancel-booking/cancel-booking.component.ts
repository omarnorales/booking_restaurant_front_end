import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css']
})
export class CancelBookingComponent implements OnInit {
  
  public codeReservation: string;
  state = "Your reservation has not been canceled"
  
  constructor( private service: AppService) { }

  ngOnInit(): void {
  }

  sendCancel(){

    this.service.cancelReservation(this.codeReservation).subscribe((result: any) => {

      this.state = "Your reservation has been successfully canceled!"
    })
  }

}
