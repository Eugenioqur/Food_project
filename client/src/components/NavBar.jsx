import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'

import SearchBar from "./SearchBar";
import { currentPage, filterByDiet, getAllDiets } from "../redux/actions";

export default function NavBar(){

const dispatch = useDispatch()
const allDiets = useSelector((state)=> state.diets)

useEffect(()=>{
    dispatch(getAllDiets())
},[dispatch])
    
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
        </div>
    )
}