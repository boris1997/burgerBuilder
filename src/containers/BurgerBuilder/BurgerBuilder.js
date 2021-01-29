/* import axios from 'axios' */
import React, { Component } from 'react'
import instance from '../../axios-orders'
import BuildControls from '../../componets/Burger/BuildControls/BuildControls'
import Burger from '../../componets/Burger/Burger'
import OrderSummary from '../../componets/Burger/OrderSummary/OrderSummary'
import Modal from '../../componets/UI/Modal/Modal'
import Spinner from '../../componets/UI/Spinner/Spinner'
import Auxilary from '../../hoc/Auxilary/Auxilary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
/* import  */

const INGRIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    /* constructor(props){
        
    } */
    state = {
        ingredients: null,
        totalPrice: 4,
        showModal: false,
        loading: false,
        error: false
    }

    addIngridientHandler = (type) => {
        /*  this.IngridientHandler */
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGRIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

    }

    removeIngridientHandler = (type, disabled) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount > 0 ? oldCount - 1 : 0  /* this.setState({ showModal: false }) */;

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDedudction = INGRIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDedudction
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        /* const Status = Object.values(updatedIngredients).reduce((a, b, i, arr) =>  b + a)
        Status === 0 && this.setState({ showModal: false }) */

    }
    showModal = () => {
        this.setState({ showModal: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ showModal: false })
    }

    purchaseContinueHandler = () => {

        console.log(this.state.ingredients)
        console.log(this.props.match.url)
        const queryParams = []
        for (let i in this.state.ingredients) {
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`)
        }
        queryParams.push(`totalPrice=${this.state.totalPrice.toFixed(2)}`)
        const queryString = queryParams.join('&') /* item=1&item=2 => [item,1][item2,2] */
        console.log(queryString)
        this.props.history.push({
            pathname: `/checkout`,
            // search: `?${Object.entries(this.state.ingredients).map((item, i) => `${item[0]/* .split(',') */}=${item[1]/* .toString(2).split(',') */}` /* `?${item[i][0]}=${item[i][1]} ` */)}`  MY ALTERNATIVE
            search: `?${queryString}`
        })
       

    }

    componentDidMount() {
        instance.get('/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data })
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
            /* console.log(disabledInfo) */
        }

        const orderBtnStatus = Object.keys(disabledInfo).every(item => disabledInfo[item])
        let orderSummary = null;


        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Auxilary>
                    <Burger /* {...this.props} */ ingredients={this.state.ingredients} />
                    <BuildControls
                        price={this.state.totalPrice}
                        disabled={disabledInfo}
                        orderDisabled={orderBtnStatus}
                        showModal={this.showModal}
                        ingridientRemoved={this.removeIngridientHandler}
                        ingridientAdded={this.addIngridientHandler} />
                </Auxilary>
            );
            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                continue={this.purchaseContinueHandler}
                modalClosed={this.purchaseCancelHandler}
                ingredients={this.state.ingredients} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (

            <Auxilary>
                <Modal show={this.state.showModal} btnStatus={orderBtnStatus} modalClosed={this.purchaseCancelHandler} > {/* {(this.state.showModal && !orderBtnStatus) && <OrderSummary ingredients={this.state.ingredients} />} */}
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilary>
        )
    }
    /* this.setState({ showModal: orderBtnStatus }) */
}


export default withErrorHandler(BurgerBuilder, instance)