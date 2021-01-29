import React from 'react'
import { Link } from 'react-router-dom'
import Auxilary from '../../../hoc/Auxilary/Auxilary'
import Button from '../../UI/Button/Button'


const OrderSummary = (props) => {
    console.log(props)
    const ingregientSummary = Object.keys(props.ingredients).map(
        item =>
            <li key={item} >
                <span style={{ textTransform: 'capitalize' }} >{item}: {props.ingredients[item]}</span>
            </li>
    )
    console.log(ingregientSummary)
    console.log(props.ingredients)
    return (
        <Auxilary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingregientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.continue} >CANCEL</Button>
            {/* <Link exact to='/Checkout' > */} <Button btnType="Success" clicked={props.continue} >CONTINUE</Button>{/* </Link> */}
        </Auxilary>
    )
}

export default OrderSummary
