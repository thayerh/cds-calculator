import { Component } from '@angular/core';
import { MealserviceService } from 'src/app/Services/mealservice.service';

@Component({
  selector: 'app-select-foods',
  templateUrl: './select-foods.component.html',
  styleUrls: ['./select-foods.component.scss']
})
export class SelectFoodsComponent {
  menu = this.mealService.menu;
  keys = Object.keys(this.menu)

  selectedDay: string | undefined;
  
  days: string[] = [
    "monday", "tuesday", "wednesday", "thursday","friday", "saturday", "sunday"
  ];

  selectedFoods = [];

  constructor(private mealService: MealserviceService){}
}
