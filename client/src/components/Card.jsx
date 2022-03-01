import React from "react";

import s from './css/Card.module.css'

export default function Card({title,image,diets}){

    let arrDiet =[]
    let showDiet =[]
    if(diets !== undefined){
        if(typeof(diets[0]) === 'object'){
            arrDiet = diets.flatMap((e)=>e.title+', ')
        }else {
            arrDiet = diets.map((e)=>e+', ')
        }
        if(arrDiet.length >= 1){
             arrDiet[arrDiet.length-1] = arrDiet[arrDiet.length-1].slice(0,-2)
        }
        showDiet = arrDiet
    }

    return(
        <div className={s.conteiner}>
            <img className={s.image} src={image} alt="no hay foto bro" />
            <div className={s.text}>
                <h1>{title}</h1>
                <p className={s.diet} >{showDiet}</p>
            </div>
        </div>
    )
}