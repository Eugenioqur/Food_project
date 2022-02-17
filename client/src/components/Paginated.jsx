import React from "react";

export default function Paginated({allRecipes,recipesPerPage,pag}){

    let pageNumbers = []

    for (let i = 1; i<= Math.ceil((allRecipes/recipesPerPage));i++){
        pageNumbers.push(i)
    }
    return(
        <div>
            <ul>
                {
                    pageNumbers && pageNumbers.map(n=>(
                        <li key ={n}>
                            <button onClick={()=> pag(n)}>{n}</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}