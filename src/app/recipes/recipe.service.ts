import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromApp from '../store/app.reducer'



@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    constructor( private store: Store<fromApp.AppState>) { }

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'test recipe',
    //         'this is a test',
    //         'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
    //         [
    //             new Ingredient('meet', 1),
    //             new Ingredient('Apple', 10)
    //         ]),
    //     new Recipe(
    //         'test2 recipe',
    //         'this is a test 2',
    //         'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
    //         [
    //             new Ingredient('buns', 3),
    //             new Ingredient('chees', 6)
    //         ]),
    // ];
    private recipes: Recipe[] = [];

    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        // this.slService.addIngredients(ingredients);
      this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
