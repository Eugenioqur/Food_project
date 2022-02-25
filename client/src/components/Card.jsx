import React from "react";

export default function Card({title,image,diets}){

    let arrDiet =[]
    let showDiet =[]
    if(diets !== undefined){
        if(typeof(diets[0]) === 'object'){
            arrDiet = diets.flatMap((e)=>e.title+', ')
        }else {
            arrDiet = diets.map((e)=>e+', ')
        }
        showDiet = arrDiet
    }

    return(
        <div>
            <h1>{title}</h1>
            <img src={image} alt="no hay foto bro" />
            <p>{showDiet}</p>
        </div>
    )
}