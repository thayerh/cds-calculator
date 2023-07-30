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

  //third layer
  selectedTimeObject = Object(this.selectedDayObject[this.selectedTime]);
  stations = Object.keys(Object(this.selectedDayObject[this.selectedTime]));
  selectedStation = ''

  //fourth layer
  selectedStationObject = Object(this.selectedTimeObject[this.selectedStation]);
  foods = Object.keys(Object(this.selectedTimeObject[this.selectedStation]));
  selectedFood = '';

  //selectedTimeObject = this.selected

public onDaySelectionChange(event: any): void {
  const selectedDay = event.value;
  this.initializeDay(selectedDay);
}

public initializeDay(day:string): string {
  this.selectedDayObject = Object(this.menu[day]);
  this.times = Object.keys(Object(this.menu[day]))
  return day;
}

public onTimeSelectionChange(event: any): void {
  const selectedTime = event.value;
  this.initializeTime(selectedTime);
}

public initializeTime(time:string): string {
  this.selectedTimeObject = Object(this.selectedDayObject[time]);
  this.stations = Object.keys(Object(this.selectedDayObject[time]));
  return time;
}

public onStationSelectionChange(event: any): void {
  const selectedStation = event.value;
  this.initializeStation(selectedStation);
}

public initializeStation(station:string): string {
  this.selectedStationObject = Object(this.selectedTimeObject[station]);
  this.foods = Object.keys(Object(this.selectedTimeObject[station]));
  return station;
}

public onFoodSelectionChange(event: any): void {
  console.log('eeee');
}

public initializeFood(food:string): string {
  console.log('oooo');
  return '';
}

  constructor(private mealService: MealserviceService){}
}
