import { FILTER_BY_PUNTUATION, FILTER_BY_TITLE, GET_ALL_RECIPES, GET_RECIPE } from "../constant";
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

export function getRecipe(id){
    return async function(dispatch){
        let json = await axios(`http://localhost:3001/recipes/${id}`,{});
        return dispatch({
            type: GET_RECIPE,
            payload: json.data
        })
    }
}

export function filterByTitle(payload){
    return({
        type: FILTER_BY_TITLE,
        payload
    })
}

export function filterByPuntuation(payload){
    return ({
        type: FILTER_BY_PUNTUATION,
        payload
    })
}