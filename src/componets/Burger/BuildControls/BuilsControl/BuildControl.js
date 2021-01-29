import React from 'react'
import classes from './BuildControl.css';

const BuildControl = (props) => {
    /* console.log(props)
    console.log(props.disabled[props.type]) */
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            {props.ingredients}
            <button disabled={props.disabled}
                onClick={props.ingridientRemoved} className={classes.Less}>less</button>
            <button onClick={props.ingridientAdded} className={classes.More} >more</button>
        </div>
    )
}

export default BuildControl
