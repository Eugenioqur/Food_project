import { CURRENT_FILTER, CURRENT_PAGE, FILTER_BY_DIET, FILTER_BY_PUNTUATION, FILTER_BY_TITLE, GET_ALL_DIETS, GET_ALL_RECIPES, GET_RECIPE, GET_SEARCH_RECIPE } from "../constant";

const initialState={
    recipes:[],
    allRecipes:[],
    recipe:[],
    diets:[],
    page: 1,
    filter:''
}

const rootReducer= (state=initialState,action)=>{
    switch(action.type){
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        
            case GET_ALL_DIETS:
                return{
                    ...state,
                    diets: action.payload
                }

        case GET_RECIPE:
            return{
                ...state,
                recipe: action.payload
            }

        case FILTER_BY_TITLE:
            let sortedArrTitle = action.payload === 'az'? state.allRecipes.sort(function(a,b){
                if( a.title > b.title){
                    return 1
                }
                if(a.title < b.title){
                    return -1
                }
                return 0
            }) : action.payload ==='za' ? state.allRecipes.sort(function(a,b){
                if (a.title > b.title){
                    return -1
                }
                if (a.title < b.title){
                    return 1
                }
                return 0
            }) : state.allRecipes
            return{
                ...state,
                recipes: sortedArrTitle,
                page: 1,
            }

        case FILTER_BY_PUNTUATION:
            let sortedArrPuntuation = action.payload === 'asc'? state.allRecipes.sort(function(a,b){
                if( a.spoonacularScore > b.spoonacularScore){
                    return 1
                }
                if(a.spoonacularScore < b.spoonacularScore){
                    return -1
                }
                return 0
            }) : action.payload ==='des' ? state.allRecipes.sort(function(a,b){
                if (a.spoonacularScore > b.spoonacularScore){
                    return -1
                }
                if (a.spoonacularScore < b.spoonacularScore){
                    return 1
                }
                return 0
            }) : state.allRecipes
            return{
                ...state,
                recipes: sortedArrPuntuation,
                page: 1,
            }

        case GET_SEARCH_RECIPE:
            return{
                ...state,
                recipes: action.payload
            }

        case FILTER_BY_DIET:
            const recipes = state.allRecipes;
            const recipesFiltered = []

            for(let i=0;i<recipes.length;i++){
                for(let j=0;j<recipes.length;j++){
                    if(recipes[i].diets[j]){
                        console.log(action.payload)
                        if(recipes[i].diets[j] === action.payload){
                        recipesFiltered.push(recipes[i])
                    }
                }
                }
            }
            if(recipesFiltered.length){
                return{
                    ...state,
                    recipes: recipesFiltered
                }
            }else{
                return{
                    ...state,
                    recipes: recipes
                }
            }

            case CURRENT_PAGE:
                return{
                    ...state,
                    page: action.payload
                }

            case CURRENT_FILTER:
                return{
                    ...state,
                    filter: action.payload
                }
        default:
            return state
    }
}

export default rootReducer;