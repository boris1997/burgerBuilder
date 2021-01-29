import React from 'react'
import { withRouter } from 'react-router-dom'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const CheckoutSummary = (props) => {
    console.log(props)



  
    return (
        <div>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '100%', margin: 'auto' }} >
                <Burger ingredients={props.ingredients} />
            </div>
            <Button clicked={props.checkoutCanceled} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.checkoutSuccessed} btnType='Success'>CONTINUE</Button>
        </div>
    )
}

export default withRouter(CheckoutSummary) 
