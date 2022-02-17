import React from "react";
import {Link} from 'react-router-dom'

import { useState,useEffect } from "react";

export default function Create(){

    const [input,setInput] = useState({
        title:'',
        summary:'',
        spooncacularScore:0,
        healtscore:0,
        analyzedInstructions:'',

    })

    return(
        <div>
            <h1>Create recipes</h1>
            <Link to='/home'><button>Home</button></Link>
        </div>
    )
}