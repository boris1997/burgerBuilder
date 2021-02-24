/* import axios from 'axios' */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import instance from '../../axios-orders'
import BuildControls from '../../componets/Burger/BuildControls/BuildControls'
import Burger from '../../componets/Burger/Burger'
import OrderSummary from '../../componets/Burger/OrderSummary/OrderSummary'
import Modal from '../../componets/UI/Modal/Modal'
import Spinner from '../../componets/UI/Spinner/Spinner'
import Auxilary from '../../hoc/Auxilary/Auxilary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as burgerBuilderCreators from '../../store/actions/index'
/* import  */


class BurgerBuilder extends Component {
    /* constructor(props){
        
    } */
    state = {
        /*  ingredients: null,
         totalPrice: 4, */
        showModal: false,
        loading: false,
    }

    showModal = () => {
        this.setState({ showModal: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ showModal: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitOrder()
        this.props.history.push(`/checkout`)


    }

    componentDidMount() {

        this.props.onFetchIngredients()

    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
            /* console.log(disabledInfo) */
        }

        const orderBtnStatus = Object.keys(disabledInfo).every(item => disabledInfo[item])
        let orderSummary = null;


        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = (
                <Auxilary>
                    <Burger /* {...this.props} */ ingredients={this.props.ingredients} />
                    <BuildControls
                        price={this.props.totalPrice}
                        disabled={disabledInfo}
                        orderDisabled={orderBtnStatus}
                        showModal={this.showModal}
                        ingridientRemoved={this.props.onRemoveIngridient}
                        ingridientAdded={this.props.onAddIngridient} />
                </Auxilary>
            );
            orderSummary = <OrderSummary
                price={this.props.totalPrice}
                continue={this.purchaseContinueHandler}
                modalClosed={this.purchaseCancelHandler}
                ingredients={this.props.ingredients} />
                
        }

        if (this.state.loading) {
            console.log(this.state.loading)
            orderSummary = <Spinner />
        }

        return (

            <Auxilary>
                <Modal show={this.state.showModal} btnStatus={orderBtnStatus}  modalClosed={this.purchaseCancelHandler} > {/* {(this.state.showModal && !orderBtnStatus) && <OrderSummary ingredients={this.state.ingredients} />} */}
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilary>
        )
    }
    /* this.setState({ showModal: orderBtnStatus }) */
}
const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAddIngridient: (ingredientType) => { dispatch(burgerBuilderCreators.addIngredient(ingredientType)) },
        onRemoveIngridient: (ingredientType) => { dispatch(burgerBuilderCreators.removeIngredient(ingredientType)) },
        onFetchIngredients: () => { dispatch(burgerBuilderCreators.fetchIngredients()) },
        onInitOrder: () => { dispatch(burgerBuilderCreators.makeOrderInit()) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, instance))