import React from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";

import {getAllRecipes ,currentPage} from "../redux/actions";
import Card from "./Card";
import Paginated from "./Paginated";
import NavBar from "./NavBar";

import s from './css/Home.module.css'

export default function Home(){

const dispatch = useDispatch();
const allRecipes = useSelector((state)=>state.recipes)
const filter = useSelector((state)=>state.filter)


const page= useSelector((state)=>state.page)
const recipesPerPage = 8
const indexOfLastRecipe = page * recipesPerPage 
const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe)


    useEffect(()=>{
        dispatch(getAllRecipes());
    },[dispatch])

   const pag = (pageNumber) =>{
        dispatch(currentPage(pageNumber))
   }

    return(
        <div>
            <NavBar/>
            <div className={s.grid}>
                {currentRecipes[0]&&currentRecipes[0].errors !== undefined ?(<h1>No results for: {currentRecipes[0].errors} </h1>) : currentRecipes.map(e =>{
                    return(
                        <NavLink className={s.card} to={`/recipes/${e.id}`}>
                            <Card
                            key= {e.id}
                            title= {e.title}
                            image= {e.image}
                            diets={e.diets}
                            />
                        </NavLink>
                    )
                })}
            </div>
            <Paginated 
            allRecipes= {allRecipes.length}
            recipesPerPage={recipesPerPage}
            pag={pag}
            page={page}
            />
        </div>
    )
}