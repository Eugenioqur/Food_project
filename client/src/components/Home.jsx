import React from "react";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux'
import { Link } from "react-router-dom";

import { filterByPuntuation, filterByTitle, getAllRecipes ,currentPage, currentFilter} from "../redux/actions";
import Card from "./Card";
import Paginated from "./Paginated";
import NavBar from "./NavBar";

export default function Home(){

const dispatch = useDispatch();
const allRecipes = useSelector((state)=>state.recipes)

const page= useSelector((state)=>state.page)
//const[currentPage,setCurrentPage] = useState(1)
const [recipesPerPage,setRecipesPerPage] = useState(9)
const indexOfLastRecipe = page * recipesPerPage 
const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe)

//const [filter,setFiter] = useState('');

    useEffect(()=>{
        dispatch(getAllRecipes());
    },[dispatch])

   const pag = (pageNumber) =>{
        dispatch(currentPage(pageNumber))
   }

   function handleSortTitle(e){
       dispatch(filterByTitle(e.target.value))
       dispatch(currentFilter(e.target.value))
    //   setFiter(e.target.value)
     //  dispatch(currentPage(1))
     //  setCurrentPage(1)
   }

   function handleSortPuntuation(e){
    dispatch(filterByPuntuation(e.target.value))
    dispatch(currentFilter(e.target.value))
   // setFiter(e.target.value)
    //dispatch(currentPage(1))
    //setCurrentPage(1)
   }

    return(
        <div>
            <h1>This is Home</h1>
            <NavBar/>
            <div>
                <select onChange = {e => handleSortTitle(e)}>
                    <option value="-">Order By Name</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
            </div>
            <div>
                <select onChange = {e => handleSortPuntuation(e)}>
                    <option value="-">Order By Puntuation</option>
                    <option value="asc">ascendant</option>
                    <option value="des">downward</option>
                </select>
            </div>
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
            <Paginated 
            allRecipes= {allRecipes.length}
            recipesPerPage={recipesPerPage}
            pag={pag}
            />
        </div>
    )
}