import React from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";

import { cleanRecipe, getRecipe } from "../redux/actions";
import s from './css/Recipe.module.css'
import Loader from "./Loader";

export default function Recipe(){

const dispatch = useDispatch();
const recipe= useSelector((state) => state.recipe)
const load = useSelector((state)=>state.load)

const {idReceta} = useParams()

useEffect(()=>{
    dispatch(getRecipe(idReceta))
    return () => dispatch(cleanRecipe())
},[])

let showRecipe = []
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

let arrDiet =[]
let showDiet =[]
if(recipe.diets !== undefined){
    if(typeof(recipe.diets[0]) === 'object'){
        arrDiet = recipe.diets.flatMap((e)=>e.title+', ')
    }else {
        arrDiet = recipe.diets.map((e)=>e+', ')
    }
    if(arrDiet.length >= 1){
        arrDiet[arrDiet.length-1] = arrDiet[arrDiet.length-1].slice(0,-2)
   }
    showDiet = arrDiet
}

    return(
        <div>
            {load ?
            <div className={s.conteiner}>
                <div className={s.card}>
                    <img src={recipe.image} alt="image not found" />
                    <p>{showDiet}</p>
                    <p><b>Score:</b>{recipe.spoonacularScore}</p>
                    <p><b>Health Score:</b>{recipe.healthScore}</p>
                    <Link to='/home'><button className={s.button}>Home</button></Link>
                </div>

                <div className={s.text}>
                    <h1>{recipe.title}</h1>
                    <div className={s.summary}>
                        <h2>Summary</h2>
                        <div dangerouslySetInnerHTML={{__html: recipe.summary}}/>
                    </div>
                    {showRecipe.length >=1 && (<h2>Recipe:</h2>)}
                    {showRecipe.length >=1 ?showRecipe[0].steps.map((e)=>(
                    <p>{e.step}</p>
                    )) :<p>Recipe is not available</p>} 
                </div>

            </div> 
            : <Loader/> }

        </div>
    )
}