import React from "react";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux'
import { Link } from "react-router-dom";

import { getAllRecipes } from "../redux/actions";
import Card from "./Card";

export default function Home(){

const dispatch = useDispatch();
const allRecipes = useSelector((state)=>state.recipes)

    useEffect(()=>{
        dispatch(getAllRecipes());
    },[dispatch])

    return(
        <div>
            <h1>This is Home</h1>
            <div>
                {allRecipes&&allRecipes.map(e =>{
                    return(
                        <Link to={`/recipes/${e.id}`}>
                            <Card
                            key= {e.id}
                            title= {e.title}
                            image= {e.image}
                            diets={e.diets}
                            />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}