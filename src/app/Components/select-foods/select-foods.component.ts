import { NONE_TYPE } from '@angular/compiler';
import { Component } from '@angular/core';
import { MealserviceService } from 'src/app/Services/mealservice.service';
import { NutritionFactsComponent } from '../nutrition-facts/nutrition-facts.component';

@Component({
  selector: 'app-select-foods',
  templateUrl: './select-foods.component.html',
  styleUrls: ['./select-foods.component.scss']
})
export class SelectFoodsComponent {
  //first layer
  menu = Object(this.mealService.menu);
  days = Object.keys(this.menu)
  selectedDay= '';

  //second layer
  selectedDayObject = Object(this.menu[this.selectedDay]);
  times = Object.keys(Object(this.menu[this.selectedDay]))
  selectedTime = ''

  //selectedTimeObject = this.selected

public initializeDay(day:string): string{
  this.selectedDayObject = this.menu[day];
  this.times = Object.keys(Object(this.menu[day]))
  return day;
}

public initializeTime(time:string): string {
  
  return time
}

  selectedFoods = [];

  constructor(private mealService: MealserviceService){}
}
