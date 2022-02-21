import React from "react";

import s from './css/Paginated.module.css'

export default function Paginated({allRecipes,recipesPerPage,pag}){

    let pageNumbers = []

    for (let i = 1; i<= Math.ceil((allRecipes/recipesPerPage));i++){
        pageNumbers.push(i)
    }
    return(
        <div>
            <ul className={s.cont}>
                {
                    pageNumbers && pageNumbers.map(n=>(
                        <li className={s.list} key ={n}>
                            <button onClick={()=> pag(n)}>{n}</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}