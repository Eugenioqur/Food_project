import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'

import SearchBar from "./SearchBar";
import { currentPage, filterByDiet, getAllDiets, filterSort } from "../redux/actions";
import s from './css/NavBar.module.css'


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
        <div className={s.conteiner}>
            <Link to='/create'><button className={s.button}>Create New Recipe</button></Link>
            <SearchBar/>

            <div>
                <select className={s.select} onChange = {e => handleSort(e)}>
                    <option value="des">downward</option>
                    <option value="asc">ascendant</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>

                </select>
            </div>
            
            <select className={s.select} onChange={e => handleFilterByDiet(e)}>
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