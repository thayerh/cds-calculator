import { NONE_TYPE } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import { MealserviceService } from 'src/app/Services/mealservice.service';
import { NutritionFactsComponent } from '../nutrition-facts/nutrition-facts.component';
import { ChosenFood } from 'src/assets/chosen-food';
import { FoodObject } from 'src/assets/food-object';
import { DatePipe } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';


@Component({
  selector: 'app-select-foods',
  templateUrl: './select-foods.component.html',
  styleUrls: ['./select-foods.component.scss'],
})
export class SelectFoodsComponent {
  @ViewChild(NutritionFactsComponent) nutritionFactsComponent!: NutritionFactsComponent;
  @ViewChild('picker') picker!: MatDatepicker<any>;

  selectedFoods: ChosenFood[] = []

  datePickerOn: boolean = true;

  //first layer
  menu = Object(this.mealService.menu);
  days = Object.keys(this.menu)
  selectedDay= '';

  minDate: Date = new Date(2023, 7, 16);
  maxDate: Date = new Date(2023, 7, 21);

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
  selectedFoodObject: FoodObject | undefined;

  //slider
  sliderValue = 0;

public onDaySelectionChange(event: any): void {
  const selectedDay: Date = event.value;
  const formattedDate: string | null = this.datePipe.transform(selectedDay, 'yyyy-MM-dd');
  if (formattedDate) {
    const formattedDateWithoutZeros: string = formattedDate.replace('-0', '-');
    this.initializeDay(formattedDateWithoutZeros);
    this.selectedDay = formattedDateWithoutZeros;
    this.selectedTime = '';
    this.selectedStation = '';
    this.selectedFood = '';
  } else {
    this.selectedDay = '';
  }
}

public initializeDay(day:string): string {
  this.selectedDayObject = Object(this.menu[day]);
  this.times = Object.keys(Object(this.menu[day]))
  return day;
}

public onTimeSelectionChange(event: any): void {
  const selectedTime = event.value;
  this.initializeTime(selectedTime);
  this.selectedStation = '';
  this.selectedFood = '';
}

public initializeTime(time:string): string {
  this.selectedTimeObject = Object(this.selectedDayObject[time]);
  this.stations = Object.keys(Object(this.selectedDayObject[time]));
  return time;
}

public onStationSelectionChange(event: any): void {
  const selectedStation = event.value;
  this.initializeStation(selectedStation);
  this.selectedFood = '';
}

public initializeStation(station:string): string {
  this.selectedStationObject = Object(this.selectedTimeObject[station]);
  this.foods = Object.keys(Object(this.selectedTimeObject[station]));
  return station;
}

public onFoodSelectionChange(event: any): void {
  this.selectedFood = event.value
  this.initializeFood(this.selectedFood)
}

public initializeFood(food:string): string {
  this.selectedFoodObject = this.selectedStationObject[this.selectedFood]
  return '';
}

public submitFood(name: string, food: any, serving: any):void {
  const myFood: ChosenFood = {
    name: name,
    quantity: serving,
    food: food
  }
  this.selectedFoods.push(myFood)
  this.selectedDay = ''
  this.selectedTime = ''
  this.selectedStation = ''
  this.selectedFood = ''
  this.sliderValue = 0

  this.nutritionFactsComponent.updateTotals()

  this.picker.select(null);
}

public removeFood(index: number): void {
  this.selectedFoods.splice(index, 1)
  
  this.nutritionFactsComponent.updateTotals()
}

  constructor(private mealService: MealserviceService, private datePipe: DatePipe ){}
}
