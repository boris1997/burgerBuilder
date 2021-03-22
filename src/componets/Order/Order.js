import React from 'react'
import classes from './Order.css'
const Order = (props) => {
    console.log(props)
    return (
        <div className={classes.Order}>
            Ingredients:
            <p> Salad ({props.ingredients.salad})</p>
            <p> cheese ({props.ingredients.cheese})</p>
            <p> meat ({props.ingredients.meat})</p>
            <p> bacon ({props.ingredients.bacon})</p>
            <p>Price:  ({props.price})</p>
            Customer:
            <p>country: ({props.customer.country}) </p>
            <p></p>
            <p></p>
            <p></p>
        </div>
    )
}

export default Order
