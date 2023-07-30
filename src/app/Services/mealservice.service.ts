import { Injectable } from '@angular/core';
import menuList from '../../../scrape/results.json'
import { FoodObject } from 'src/assets/food-object';
import { ChosenFood } from 'src/assets/chosen-food';


@Injectable({
  providedIn: 'root'
})
export class MealserviceService {

  menu= menuList;


  constructor() { }
}
