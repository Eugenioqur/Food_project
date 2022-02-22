import React from "react";
import {useState} from 'react'
import {useDispatch} from 'react-redux'

import { getRecipeSearch } from "../redux/actions";

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
            <input type="text"  placeholder="Search..." value={search.search} onChange={(e)=>handleChange(e)}/>
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
        )
}