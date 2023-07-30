import { Injectable } from '@angular/core';
import menuList from '../../../scrape/results.json'
import { FoodItem } from 'src/assets/food-item';
import { DaysMenu } from 'src/assets/days-menu';
import { Menu } from 'src/assets/menu';

@Injectable({
  providedIn: 'root'
})
export class MealserviceService {

  menu= menuList;


  constructor() { }
}
