import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../componets/Order/CheckoutSummary/CheckoutSummary'
import Spinner from '../../componets/UI/Spinner/Spinner'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: null
    }



    checkoutCanceled = () => {
        console.log(this.props)
        this.props.history.goBack()
        /* this.props.history.push('/') */
    }
    checkoutSuccessed = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search)
        console.log(query)
        let ingredients = {}
        for (let param of query) {
            console.log(param)
            param[0] !== 'totalPrice' ? (ingredients[param[0]] = +param[1]) : this.setState({ totalPrice: +param[1] });
            // this.setState({ ingredients: Object.fromEntries(param[1].split(',').map(item => item.split('='))) })   MY ALTERNATIVE
        }
        this.setState({ ingredients: ingredients })
        console.log(ingredients, this.state.totalPrice)
    }

    render() {
        /*  console.log(this.state.ingredients, this.state.totalPrice )
         let checkoutSummary = <Spinner />;
         if (this.state.ingredients) {
             checkoutSummary = <CheckoutSummary checkoutSuccessed={this.checkoutSuccessed} checkoutCanceled={this.checkoutCanceled} ingredients={this.state.ingredients} />
         } */
        return (
            <div>
                <CheckoutSummary checkoutSuccessed={this.checkoutSuccessed} checkoutCanceled={this.checkoutCanceled} ingredients={this.state.ingredients} />
                <Route path={`${this.props.match.path}/contact-data`} render={(props) => (<ContactData {...props} ingredients={this.state.ingredients} price={this.state.totalPrice} />)} />
            </div>
        )
    }
}

export default Checkout
