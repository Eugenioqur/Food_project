import { CURRENT_FILTER, CURRENT_PAGE, FILTER_SORT, FILTER_BY_DIET, GET_ALL_DIETS, GET_ALL_RECIPES, GET_RECIPE, GET_SEARCH_RECIPE } from "../constant";
import axios from 'axios'

export function getAllRecipes() {
    return async function(dipatch){
        let json =await axios('http://localhost:3001/recipes',{});
        return dipatch({
            type:GET_ALL_RECIPES,
            payload: json.data
        })
    }
}

export function getAllDiets() {
    return async function(dispatch){
        let json = await axios('http://localhost:3001/types',{});
        return dispatch({
            type:GET_ALL_DIETS,
            payload: json.data
        })
    }
}

export function getRecipe(id){
    return async function(dispatch){
        let json = await axios(`http://localhost:3001/recipes/${id}`,{});
        return dispatch({
            type: GET_RECIPE,
            payload: json.data
        })
    }
}

export function filterSort(payload){
    return({
        type: FILTER_SORT,
        payload
    })
}



export function getRecipeSearch(search){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/recipes?name='+search)
            return dispatch({
                type:GET_SEARCH_RECIPE,
                payload:json.data
            })
        } catch(error){
            console.log(error)
        }
    }
    
}

export function filterByDiet(payload){
    return {
        type: FILTER_BY_DIET,
        payload
    }
}

export function currentPage(payload){
    return{
        type: CURRENT_PAGE,
        payload
    }
}

export function currentFilter(payload){
    return{
        type:CURRENT_FILTER,
        payload
    }
}