import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {

    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        //mindent át ír ami ott volt alapból
        this.http.put(
            'https://http-request-tutorial-3d4f6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            recipes
        ).subscribe(response => {
            console.log(response)
        });
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>('https://http-request-tutorial-3d4f6-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                });
            }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            )

    }
}