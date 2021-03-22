import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    ordered: false

}

const getOrderStart = (state, action) => {
    return updateObject(state, { loading: true })
}
const getOrderSuccess = (state, action) => {
    return updateObject(state, { orders: action.order, loading: false })
}
const getOrderFailed = (state, action) => {
    return updateObject(state, { loading: false })
}
const makeOrderInit = (state, action) => {
    return updateObject(state, { loading: false, ordered: false })
}
const makeOrderSuccess = (state, action) => {
    const updatedOrders = updateObject(action.order, { id: action.id })
    return updateObject(state, {
        orders: state.orders.concat(updatedOrders),
        loading: false,
        ordered: true
    })
}
const makeOrderStart = (state, action) => {
    return updateObject(state, { loading: true })
}
const makeOrderFailed = (state, action) => {
    return updateObject(state, { loading: true })
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDER_START: return getOrderStart(state, action)
        case actionTypes.GET_ORDER_SUCCESS: return getOrderSuccess(state, action)
        case actionTypes.GET_ORDER_FAILED: return getOrderFailed(state, action)
        case actionTypes.MAKE_ORDER_INIT: return makeOrderInit(state, action)
        case actionTypes.MAKE_ORDER_SUCCESS: return makeOrderSuccess(state, action)
        case actionTypes.MAKE_ORDER_START: return makeOrderStart(state, action)
        case actionTypes.MAKE_ORDER_FAILED: return makeOrderFailed(state, action)
        default:
            return state

    }

}

export default reducer