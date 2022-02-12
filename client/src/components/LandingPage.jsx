import React from "react";
import {Link} from 'react-router-dom';

export default function LandinPage(){

    return(
        <div>
            <h1>Landin Page</h1>
            <Link to='/home'>
                <button>start</button>
            </Link>
        </div>
    )
}