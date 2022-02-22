import { FILTER_BY_PUNTUATION, FILTER_BY_TITLE, GET_ALL_RECIPES, GET_RECIPE, GET_SEARCH_RECIPE } from "../constant";

const initialState={
    recipes:[],
    allRecipes:[],
    recipe:[]
,}

const rootReducer= (state=initialState,action)=>{
    switch(action.type){
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
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
                recipes: sortedArrTitle
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
                recipes: sortedArrPuntuation
            }
        case GET_SEARCH_RECIPE:
            return{
                ...state,
                recipes: action.payload
            }
        default:
            return state
    }
}

export default rootReducer;