import React from "react";
import {Link} from 'react-router-dom'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, postRecipe } from "../redux/actions";

export default function Create(){
    const dispatch = useDispatch()
    const allDiets = useSelector((state)=> state.diets)


    useEffect(()=>{
        dispatch(getAllDiets())
    },[dispatch])

    const [input,setInput] = useState({
        title:'',
        summary:'',
        analyzedInstructions:'',
        spoonacularScore:'',
        healthScore:'',
        diets:[]
    })

    const [err,setErr] = useState('')
    const [arrDiet,setArrDiet] = useState('')

    function controller(){
        if(input.title === ''){
            return 'title'
        }else if(input.summary === ''){
            return 'summary'
        }else if(input.analyzedInstructions === ''){
            return 'instruction'
        }else if(input.spoonacularScore === ''){
            return 'score'
        }else if(input.healthScore === ''){
            return 'healtscore'
        }else if(!input.diets.length){
            return 'diet'
        }else{
            return 'ok'
        }
    }

    function handleChange(e){
        
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
    }

    function handleSelect(e){
        if (e.target.value !== "" && !arrDiet.includes(e.target.value)){
            setArrDiet([...arrDiet,e.target.value])
            setInput({
                ...input,
                diets: [...input.diets,e.target.value]
            })
        }

    }

    function handleSubmit(e){
        e.preventDefault();
        const check = controller()
        if(check === 'title' ){
            let name='Complete the Title'
            setErr(name)
        }else if(check === 'summary'){
            let summary = 'Complete the Summary'
            setErr(summary)
        }else if (check === 'instruction'){
            let instruction = 'Complete the Instructions'
            setErr(instruction)
        }else if(check === 'score'){
            let score = 'Assign a Score'
            setErr(score)
        }else if(check === 'healtscore'){
            let healtscore = 'Assign a Healtscore'
            setErr(healtscore)
        }else if(check === 'diet'){
            let diet = 'Assign a Diet'
            setErr(diet)
        }else{
            setErr('')
            dispatch(postRecipe(input))
            setInput({
                title:'',
                summary:'',
                analyzedInstructions:'',
                spoonacularScore:'',
                healthScore:'',
                diets:[]
            })
            alert('yeahhhh')
        }
    }
    

    return(
        <div>
            <h1>Create recipes</h1>

            <form onSubmit={(e)=>handleSubmit(e)}>
                
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
                    <input type="text" value={input.spoonacularScore} name='spoonacularScore' placeholder='Puntuation' onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Healtscoore</label>
                    <input type="text" value={input.healthScore} name='healthScore' placeholder='Healt Scoore' onChange={(e)=>handleChange(e)}/>
                </div>
                <div>
                    <label>Diets</label>
                    <select onChange={(e)=> handleSelect(e) }>
                        <option> </option>
                        {allDiets.map((e)=>(
                            <option value={e.title}>{e.title}</option>
                        ))}
                    </select>
                </div>
                
                {err && (<div>{err}</div>)}
                <button type='submit'>Submit</button>
                <Link to='/home'><button>Home</button></Link>
            </form>
        </div>
    )
}