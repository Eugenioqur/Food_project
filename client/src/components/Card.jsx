import React from "react";

export default function Card({title,image,diets}){
    return(
        <div>
            <h1>{title}</h1>
            <img src={image} alt="no hay foto bro" />
            <p>{diets}</p>
        </div>
    )
}