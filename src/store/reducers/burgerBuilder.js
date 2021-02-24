import instance from '../../axios-orders'
import * as actionTypes from '../actions/actionTypes'

const initialState = {

    ingredients: null,
    error: false,
    totalPrice: 4
}

const INGRIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7 
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGRIENT_PRICES[action.ingredient]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalPrice: state.totalPrice - INGRIENT_PRICES[action.ingredient]
            }
        case actionTypes.FETCH_INGREDIENT:
            console.log(action.value)
                return {
                    ...state,
                    ingredients: action.ingredients,
                    totalPrice: 4,
                    error: false
                }
        case actionTypes.MAKE_ORDER_FAILED:
            console.log(action.value)
                return {
                    ...state,
                    error: action.error
                }
        default:
            return state
    }
    // skip default case
}

export default reducer