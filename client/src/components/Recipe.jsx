import React from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
// import { useStore,useEffect } from "react-redux";

import { Link, useParams } from "react-router-dom";

import { getRecipe } from "../redux/actions";

export default function Recipe(){

const dispatch = useDispatch();
const {title,image,diets,summary,spoonacularScore,healthScore,analyzedInstructions}= useSelector((state) => state.recipe)

const {idReceta} = useParams()

useEffect(()=>{
    dispatch(getRecipe(idReceta))
},[])


    return(
        <div>
            <h1>{title}</h1>
            <img src={image} alt="no hay foto bro" />
            <p>{diets}</p>
            <div dangerouslySetInnerHTML={{__html: summary}}/>
            <p>{spoonacularScore}</p>
            <p>{healthScore}</p>
            <Link to='/home'><button>Home</button></Link>
        </div>
    )
}