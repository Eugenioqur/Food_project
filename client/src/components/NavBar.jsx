import React from "react";
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import {useDispatch,useSelector} from 'react-redux'

import SearchBar from "./SearchBar";
import { currentPage, filterByDiet, getAllDiets, filterSort } from "../redux/actions";


export default function NavBar(){

const dispatch = useDispatch()
const allDiets = useSelector((state)=> state.diets)

useEffect(()=>{
    dispatch(getAllDiets())
},[dispatch])



function handleSort(e){
    dispatch(filterSort(e.target.value))
}

    
function handleFilterByDiet(e){
    dispatch(filterByDiet(e.target.value))
    dispatch(currentPage(1))
}


    return(
        <div>
            <Link to='/create'><button>Create</button></Link>
            <SearchBar/>
            <select onChange={e => handleFilterByDiet(e)}>
                <option value=""></option>
                {
                    allDiets.map((e)=>(
                        <option value={e.title}>{e.title}</option>
                    ))
                }
            </select>

            <div>
                <select onChange = {e => handleSort(e)}>
                    <option value="des">downward</option>
                    <option value="asc">ascendant</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>

                </select>
            </div>
            
        </div>
    )
}