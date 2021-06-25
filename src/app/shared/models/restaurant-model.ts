import { LightRestaurant } from './restaurant-light-model';
import { Turn } from './turn-model';

export class Restaurant extends LightRestaurant{
 
    description: string;
    turn:        Turn[];
    price: number;
}

