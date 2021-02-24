import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false,
    ordered: false

}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDER:
            console.log(console.log(action.order))
            return {
                ...state,
                orders: action.order,
                loading: false/* ,
                ordered: false */
            }

        case actionTypes.MAKE_ORDER_INIT:
            return {
                ...state,
                ordered: false
            }
        case actionTypes.MAKE_ORDER_SUCCESS:
            const updatedOrders = {
                ...action.order,
                id: action.id
            }
            console.log(state.orders)
            console.log(updatedOrders)
            return {
                ...state,
                orders: state.orders.concat(updatedOrders),
                loading: false,
                ordered: true
            }
        case actionTypes.MAKE_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.MAKE_ORDER_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state

    }

}

export default reducer