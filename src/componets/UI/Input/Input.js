import React from 'react'

import classes from './Input.css'

const Input = (props) => {
    let inputElement = null;
    /* console.log(props.elementType)
    console.log(props) */
    const inputClasses = [classes.Input];

    if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }
    console.log(props)
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changedInput} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')}  {...props.elementConfig} value={props.value} onChange={props.changedInput} />;
            break;
        case ('select'):
            inputElement = (
                <select className={inputClasses.join(' ')} value={props.value} onChange={props.changedInput} > {props.elementConfig.options.map(option => <option key={option.value} value={option.value} >{option.displayValue}</option>)}
                </ select >
            )

            break;
        default:
            inputElement = <input className={inputClasses} {...props.elementConfig} value={props.value} />;
    }

    return (
        <div>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input
