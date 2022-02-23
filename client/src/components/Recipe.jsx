import React from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";

import { cleanRecipe, getRecipe } from "../redux/actions";

export default function Recipe(){

const dispatch = useDispatch();
const recipe= useSelector((state) => state.recipe)

const {idReceta} = useParams()

useEffect(()=>{
    dispatch(getRecipe(idReceta))
},[])

useEffect(()=>{
    return () => dispatch(cleanRecipe())
},[])

    return(
        <div>
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt="image not found" />
            <p>{recipe.diets}</p>
            <div dangerouslySetInnerHTML={{__html: recipe.summary}}/>
            <p>{recipe.spoonacularScore}</p>
            <p>{recipe.healthScore}</p>
            <Link to='/home'><button>Home</button></Link>
        </div>
    )
}