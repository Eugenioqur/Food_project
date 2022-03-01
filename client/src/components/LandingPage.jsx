import React from "react";
import {Link} from 'react-router-dom';

import s from './css/landinpage.module.css'

export default function LandinPage(){

    return(
        <div className={s.body}>
            <div className={s.conteiner}>
                <h1 className={s.text} >Food Recipes </h1>
                <Link to='/home'>
                    <button className={s.button}>start</button>
                </Link>
            </div>
        </div>

    )
}