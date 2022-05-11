import React from "react";
import loader from './images/loaderGif.gif'
import s from './css/Loader.module.css'

export default function Loader(){
    return(
        <div className={s.container}>
        <img className={s.image} src={loader} alt="loading"/>
        <p className={s.text}>Loading info...</p>
        </div>
    )
}