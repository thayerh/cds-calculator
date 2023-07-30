import { Component, Input } from '@angular/core';
import { MealserviceService } from 'src/app/Services/mealservice.service';
import { ChosenFood } from 'src/assets/chosen-food';
import { FoodObject } from 'src/assets/food-object';
import { FoodTotals } from 'src/assets/food-totals';

@Component({
  selector: 'app-nutrition-facts',
  templateUrl: './nutrition-facts.component.html',
  styleUrls: ['./nutrition-facts.component.scss']
})
export class NutritionFactsComponent {
  @Input() selectedFoods!: ChosenFood[];

  cummulitiveTotals: FoodTotals = {
    "Amount Per Serving": 0,
    "Calories": 0,
    "Calories from Fat": 0,
    "Total Fat": 0,
    "Saturated Fat": 0,
    "Trans Fat": 0,
    "Cholesterol": 0,
    "Sodium": 0,
    "Total Carbohydrate": 0,
    "Dietary Fiber": 0,
    "Sugars": 0,
    "Protein": 0
  };

  public updateTotals(){
    let last = Object(this.selectedFoods[-1].food)
    let keys = Object.keys(last.food)
    for (const key of keys) {
      const regex = /\d+/g; // Regular expression to match one or more digits
      const matches = last[key].match(regex);
      Object(this.cummulitiveTotals)[key] += Number(matches)
    }
  }



  constructor(){}
  
}
