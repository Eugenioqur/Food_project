import React from "react";
import {useState} from 'react'
import {useDispatch} from 'react-redux'

import { getRecipeSearch } from "../redux/actions";
import s from './css/SearchBar.module.css'

export default function SearchBar(){
const dispatch = useDispatch()
const[search,setSearch] =useState({search:''})

function handleChange(e){
    e.preventDefault();
    setSearch({
        ...search,
        search: e.target.value
    })
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(getRecipeSearch(search.search))
    setSearch({search:''})
}


    return(
        <div>
            <input className={s.input}type="text"  placeholder="Search..." value={search.search} onChange={(e)=>handleChange(e)}/>
            <button type="submit" className={s.button} onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
        )
}