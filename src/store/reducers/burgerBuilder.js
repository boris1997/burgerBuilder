// import instance from '../../axios-orders';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

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

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredient]: state.ingredients[action.ingredient] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGRIENT_PRICES[action.ingredient]
    }
    return updateObject(state, updatedState);
}
const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredient]: state.ingredients[action.ingredient] - 1 }
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGRIENT_PRICES[action.ingredient]
    }
    return updateObject(state, updatedSt);
}

const fetchIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
    });
}

const makeOrderFail = (state, action) => {
    return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.FETCH_INGREDIENT: return fetchIngredient(state, action)
        case actionTypes.MAKE_ORDER_FAILED: return makeOrderFail(state, action)
        default:
            return state
        }
        // skip default case
    }
    
    export default reducer
    /*         return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGRIENT_PRICES[action.ingredient]
            } */