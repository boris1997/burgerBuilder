import instance from '../../axios-orders'
import * as actionTypes from '../actions/actionTypes'

export const addIngredient = (ingredientType) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: ingredientType
    }

}
export const removeIngredient = (ingredientType) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: ingredientType
    }

}

export const fetchIngredients = () => {
    return (dispatch) => {
        instance.get('/ingredients.json')
            .then(res => {
                dispatch({ type: actionTypes.FETCH_INGREDIENT, ingredients: res.data })
            })
            .catch(error => {
                dispatch({ type: actionTypes.MAKE_ORDER_FAILED, error: true })
            })

    }
}