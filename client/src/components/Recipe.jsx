import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";

import { cleanRecipe, getRecipe } from "../redux/actions";

export default function Recipe(){

const dispatch = useDispatch();
const recipe= useSelector((state) => state.recipe)
const load = useSelector((state)=>state.load)

const {idReceta} = useParams()

useEffect(()=>{
    dispatch(getRecipe(idReceta))
},[])

useEffect(()=>{
    return () => dispatch(cleanRecipe())
},[])

let showRecipe = []

//if(load){
    if(recipe.analyzedInstructions !== undefined){
        if(Array.isArray(recipe.analyzedInstructions)){
            let steps=[]
            recipe.analyzedInstructions.forEach((e)=>{
                steps.push(e)
            })
            if(steps.length >= 1){
                steps.forEach((e)=>{
                    showRecipe.push(e)
                })
            }
        }
        else{
            showRecipe = [...showRecipe,{steps:[{step: recipe.analyzedInstructions}]}]
        }
    }
//}
console.log(recipe)

    return(
        <div>
            {load ?
            <div>
                <h1>{recipe.title}</h1>
                <img src={recipe.image} alt="image not found" />
                {/* <p>{recipe.diets}</p> */}
                <div dangerouslySetInnerHTML={{__html: recipe.summary}}/>
                <p>{recipe.spoonacularScore}</p>
                <p>{recipe.healthScore}</p>
                {showRecipe.length >=1 ? showRecipe[0].steps.map((e)=>(
                <p>{e.step}</p>
                )) :<p>Recipe is not available</p>} 
                <Link to='/home'><button>Home</button></Link>
            </div> 
            : <p>loading</p> }

        </div>
    )
}