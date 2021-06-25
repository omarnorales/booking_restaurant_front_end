import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { LightRestaurant } from 'src/app/shared/models/restaurant-light-model';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  public restaurants: LightRestaurant[];

  constructor(private service: AppService,
              private router: Router) { }

  ngOnInit(): void {

    this.service.getAllRestaurants().subscribe((result: any) => {
        this.restaurants = result.data;
    })
  }

  book(restairantId: string){

    this.router.navigate(['/booking',restairantId])
  }

  share(){
    
  }

}
