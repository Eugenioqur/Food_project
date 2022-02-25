import { CLEAN_RECIPE, CURRENT_FILTER, CURRENT_PAGE, FILTER_BY_DIET, FILTER_SORT, GET_ALL_DIETS, GET_ALL_RECIPES, GET_RECIPE, GET_SEARCH_RECIPE, POST_NEW_RECIPE } from "../constant";

const initialState={
    recipes:[],
    allRecipes:[],
    recipe:[],
    diets:[],
    filter:'',
    page: 1,
    load:false
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
                recipe: action.payload,
                load:true
            }

        case FILTER_SORT:
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
            }) : action.payload === 'asc' ? state.allRecipes.sort(function(a,b){
                if( a.spoonacularScore > b.spoonacularScore){
                    return 1
                }
                if(a.spoonacularScore < b.spoonacularScore){
                    return -1
                }
                return 0
            }): action.payload === 'des' ? state.allRecipes.sort(function(a,b){
                if (a.spoonacularScore > b.spoonacularScore){
                    return -1
                }
                if (a.spoonacularScore < b.spoonacularScore){
                    return 1
                }
                return 0
            }):state.allRecipes
            return{
                ...state,
                recipes: sortedArrTitle,
                filter: action.payload,
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

            case CLEAN_RECIPE:
                return{
                    ...state,
                    recipe:[],
                    load:false
                }
            
            case POST_NEW_RECIPE:
                return{
                ...state
                }
        default:
            return state
    }
}

export default rootReducer;