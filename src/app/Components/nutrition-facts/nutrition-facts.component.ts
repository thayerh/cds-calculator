import { Component, Input } from '@angular/core';
import { MealserviceService } from 'src/app/Services/mealservice.service';
import { ChosenFood } from 'src/assets/chosen-food';
import { FoodObject } from 'src/assets/food-object';

@Component({
  selector: 'app-nutrition-facts',
  templateUrl: './nutrition-facts.component.html',
  styleUrls: ['./nutrition-facts.component.scss']
})
export class NutritionFactsComponent {
  @Input() selectedFoods!: ChosenFood[];
  constructor(){}
  
}
