import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import CheckoutSummary from '../../componets/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import * as orderCreators from '../../store/actions/index'

class Checkout extends Component {

    checkoutCanceled = () => {
        console.log(this.props)
        this.props.history.goBack()
        /* this.props.history.push('/') */
    }
    checkoutSuccessed = () => {
        this.props.history.replace('/checkout/contact-data')
    }

   /*  componentWillMount() {
        console.log('ok')
        this.props.onInitOrder()
    } */

    render() {
        /*  console.log(this.state.ingredients, this.state.totalPrice )
         let checkoutSummary = <Spinner />;
         if (this.state.ingredients) {
             checkoutSummary = <CheckoutSummary checkoutSuccessed={this.checkoutSuccessed} checkoutCanceled={this.checkoutCanceled} ingredients={this.state.ingredients} />
         } */
        console.log(this.props.ordered)
        let summary = <Redirect to="/" />
        if (this.props.ingredients) {
            const orderedRedirect = this.props.ordered ? <Redirect to="/" /> : null;
            console.log(orderedRedirect)
            summary = (
                <div>
                    {orderedRedirect}
                    <CheckoutSummary checkoutSuccessed={this.checkoutSuccessed} checkoutCanceled={this.checkoutCanceled} ingredients={this.props.ingredients} />
                    <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        ordered: state.order.ordered,
    }
}

/* const mapDispatchToProps = dispatch => {
    return {
        onInitOrder: () => { dispatch(orderCreators.makeOrderInit()) }
    }
} */

export default connect(mapStateToProps /* mapDispatchToProps */)(Checkout)
