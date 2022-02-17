import React from "react";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux'
import { Link } from "react-router-dom";

import { getAllRecipes } from "../redux/actions";
import Card from "./Card";
import Paginated from "./Paginated";

export default function Home(){

const dispatch = useDispatch();
const allRecipes = useSelector((state)=>state.recipes)

const[currentPage,setCurrentPage] = useState(1)
const [recipesPerPage,setRecipesPerPage] = useState(9)
const indexOfLastRecipe = currentPage * recipesPerPage 
const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe)

    useEffect(()=>{
        dispatch(getAllRecipes());
    },[dispatch])

   const pag = (pageNumber) =>{
       setCurrentPage(pageNumber)
   }

    return(
        <div>
            <h1>This is Home</h1>
            <Link to='/create'><button>Create</button></Link>
            <Paginated 
            allRecipes= {allRecipes.length}
            recipesPerPage={recipesPerPage}
            pag={pag}
            />
            <div>
                {currentRecipes&&currentRecipes.map(e =>{
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