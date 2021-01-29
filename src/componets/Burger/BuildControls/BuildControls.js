import React from 'react'
import classes from './BuildControls.css'
import BuildControl from '../BuildControls/BuilsControl/BuildControl'

const constrols = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]
const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong>  </p>
            {constrols.map(item => (
                <BuildControl
                    disabled={props.disabled[item.type]}
                    ingridientRemoved={() => { props.ingridientRemoved(item.type, props.orderDisabled) }}
                    ingridientAdded={() => { props.ingridientAdded(item.type) }}
                    key={item.label} label={item.label} />))}
            <button onClick={props.showModal} disabled={props.orderDisabled} className={classes.OrderButton}>Order now</button>
        </div>
    )
}

export default BuildControls
