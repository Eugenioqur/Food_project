import React from "react";

import s from './css/Paginated.module.css'

export default function Paginated({allRecipes,recipesPerPage,pag,page}){

    let pageNumbers = []

    for (let i = 1; i<= Math.ceil((allRecipes/recipesPerPage));i++){
        pageNumbers.push(i)
    }
    return(
        <div>
            <ul className={s.cont}>
            {page > 2 ? (<li className={s.list}><button className={s.button}  onClick={()=> pag(1)}>First Page</button></li>) :(<li className={s.list}><p></p></li>) }
            {page > 1 ? (<li className={s.list}><button className={s.button}  onClick={()=> pag(page-1)}>-</button></li>) :(<li className={s.list}><p></p></li>) }
                {page > 1 && page < (Math.ceil((allRecipes/recipesPerPage))) ? 
                (<>  
                <li className={s.list} key ={page-1}>
                <button className={s.button} onClick={()=> pag(page-1)}>{page-1}</button>
                </li>|
                <li className={s.list} key ={page}>
                <button className={s.currentButton}>{page}</button>
                </li>
                <li className={s.list} key ={page+1}>
                <button className={s.button} onClick={()=> pag(page+1)}>{page+1}</button>
                </li>
                </>)
                : page === 1 ?
                (<>  
                    <li className={s.list} key ={1}>
                    <button className={s.currentButton}>1</button>
                    </li>
                    {Math.ceil((allRecipes/recipesPerPage)) >=2 ? (
                    <li className={s.list} key ={2}>
                    <button className={s.button} onClick={()=> pag(2)}>{2}</button>
                    </li>
                    ):(<></>)}
                    {Math.ceil((allRecipes/recipesPerPage)) >=3 ? (
                    <li className={s.list} key ={3}>
                    <button className={s.button} onClick={()=> pag(3)}>{3}</button>
                    </li>
                    ):(<></>)}
                    </>)

                : page === Math.ceil((allRecipes/recipesPerPage)) ?
                (<>  
                    <li className={s.list} key ={page-2}>
                    <button className={s.button} onClick={()=> pag(page-2)}>{page-2}</button>
                    </li>
                    <li className={s.list} key ={page-1}>
                    <button className={s.button} onClick={()=> pag(page-1)}>{page -1}</button>
                    </li>
                    <li className={s.list} key ={page}>
                    <button className={s.currentButton}>{page}</button>
                    </li>
                    </>)
                :(<p>error</p>)
                }
                
            {page < Math.ceil((allRecipes/recipesPerPage)) ? (<li className={s.list}><button className={s.button}  onClick={()=> pag(page+1)}>+</button></li>) :(<li className={s.list}><p></p></li>) }
            {page < (Math.ceil((allRecipes/recipesPerPage))-1) && 3>= Math.ceil((allRecipes/recipesPerPage)) ? (<li className={s.list}><button className={s.button}  onClick={()=> pag(Math.ceil((allRecipes/recipesPerPage)))}>Last Page</button></li>) :(<li className={s.list}><p></p></li>) }
            </ul>
        </div>
    )
}