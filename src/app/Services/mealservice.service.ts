import { Injectable } from '@angular/core';
import menuList from '../../../scrape/results.json'


@Injectable({
  providedIn: 'root'
})
export class MealserviceService {

  menu= menuList;


  constructor() { }
}
