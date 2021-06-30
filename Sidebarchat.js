import React from 'react';
import { Avatar} from '@material-ui/core';
import "./sidebarchat.css"

function Sidebarchat({name ,src,msg}) {
    console.log(src)
    return (
        <div className="sidebarchat">
            <Avatar src={src} />
            <div className="sidebarchat_info">
                <h2> {name}</h2>
                <p> {msg} </p>
            </div>
        </div>
    )
}

export default Sidebarchat
