import React from "react";
import {Link} from 'react-router-dom'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, postRecipe } from "../redux/actions";

import s from './css/Create.module.css'

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

    let aNumber = /\d/

    function controller(){
        if(input.title === ''){
            return 'title'
        }else if(input.summary === ''){
            return 'summary'
        }else if(input.analyzedInstructions === ''){
            return 'instruction'
        }else if(input.spoonacularScore === ''){
            return 'score'
        }else if(!aNumber.test(input.spoonacularScore) || input.spoonacularScore > 100 || input.spoonacularScore < 1 ){
            return 'scoreNum'
        } else if(input.healthScore === ''){
            return 'healtscore'
        }else if(!aNumber.test(input.healthScore) || input.healthScore > 100 || input.healthScore < 1 ){
            return 'scoreHealth'
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
        }else if(check === 'scoreNum'){
            let scoreNum = 'Score must be a number between 1 and 100'
            setErr(scoreNum)
        }else if(check === 'healtscore'){
            let healtscore = 'Assign a Healtscore'
            setErr(healtscore)
        }else if(check === 'scoreHealth'){
            let scoreHealth = 'Healthscoore must be a number between 1 and 100'
            setErr(scoreHealth)
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
        <div className={s.body}>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <h1 className={s.title}>Create new recipe</h1>
            <div className={s.conteiner}>
                    <div className={s.short}>
                        <div>
                            <label>Title</label>
                            <input className={s.inputS} type="text" value={input.title} name='title' placeholder='Title...' onChange={(e)=>handleChange(e)}/>
                        </div>
                        <div>
                            <label>Puntuation</label>
                            <input className={s.inputS} type="text" value={input.spoonacularScore} name='spoonacularScore' placeholder='Puntuation' onChange={(e)=>handleChange(e)}/>
                        </div>
                        <div>
                            <label>Healtscoore</label>
                            <input className={s.inputS} type="text" value={input.healthScore} name='healthScore' placeholder='Healt Scoore' onChange={(e)=>handleChange(e)}/>
                        </div>
                        <div>
                            <label>Diets</label>
                            <select className={s.select} onChange={(e)=> handleSelect(e) }>
                                <option> </option>
                                {allDiets.map((e)=>(
                                    <option value={e.title}>{e.title}</option>
                                ))}
                            </select>
                        </div>
                        <p></p>
                        {err && (<div className={s.error}>{err}</div>)}
                        <button className={s.button} type='submit'>Submit</button>
                        <Link to='/home'><button className={s.button} >Home</button></Link>
                    </div>
                    <div className={s.long}>
                            <label>Summary</label>
                        <div>
                            <textarea className={s.inputL} value={input.summary} name='summary' placeholder="Summary" cols="30" rows="10"onChange={(e)=>handleChange(e)}/>
                            {/* <input  className={s.inputL} type="text" value={input.summary} name='summary' placeholder='Summary' onChange={(e)=>handleChange(e)}/> */}
                        </div>
                            <label>Instructions</label>
                        <div>
                            <textarea className={s.inputL} type="text" value={input.analyzedInstructions} name="analyzedInstructions" placeholder='instructions' cols="30" rows="10" onChange={(e)=>handleChange(e)}/>
                        </div>
                    </div>
                    

            </div>
            </form>
            <p></p>
        </div>
    )
}