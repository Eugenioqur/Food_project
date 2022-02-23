import React from "react";
import {Link} from 'react-router-dom'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets } from "../redux/actions";

export default function Create(){
    const dispatch = useDispatch()
    const allDiets = useSelector((state)=> state.diets)

    useEffect(()=>{
        dispatch(getAllDiets())
    },[dispatch])

    const [input,setInput] = useState({
        title:'',
        summary:'',
        spooncacularScore:'',
        healtscore:'',
        analyzedInstructions:'',

    })

    function handleChange(e){

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div>
            <h1>Create recipes</h1>
            <div>
                <label>Title</label>
                <input type="text" value={input.title} name='title' placeholder='Title...' onChange={(e)=>handleChange(e)}/>
            </div>
            <div>
                <label>Summary</label>
                <input type="text" value={input.summary} name='summary' placeholder='Summary' onChange={(e)=>handleChange(e)}/>
            </div>
            <div>
                <label>Instructions</label>
                <input type="text" value={input.analyzedInstructions} name='analyzedInstructions'placeholder='instructions' onChange={(e)=>handleChange(e)}/>
            </div>
            <div>
                <label>Puntuation</label>
                <input type="text" value={input.spooncacularScore} name='spooncacularScore' placeholder='Puntuation' onChange={(e)=>handleChange(e)}/>
            </div>
            <div>
                <label>Healtscoore</label>
                <input type="text" value={input.healtscore} name='healtscore' placeholder='Healt Scoore' onChange={(e)=>handleChange(e)}/>
            </div>
            <div>
                <label>Diets</label>
                <select>
                    {allDiets.map((e)=>(
                        <option value={e.title}>{e.title}</option>
                    ))}
                </select>
            </div>
            
            <Link to='/home'><button>Home</button></Link>
        </div>
    )
}