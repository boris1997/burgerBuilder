import instance from "../../axios-orders"
import * as actionTypes from '../actions/actionTypes'

export const getOrder = () => {
    return (dispatch) => {
        instance.get('/order.json')
            .then(res => {
                console.log(res)
                dispatch({ type: actionTypes.GET_ORDER, order: res.data })
            })
            .catch(err =>
                dispatch({ type: actionTypes.SHOW_LOAD, error: false })
            )
    }
}

export const makeOrderStart = () => {
    console.log('object')
    return { type: actionTypes.MAKE_ORDER_START }

}
export const makeOrderSucces = (orderData, orderId) => {
    return { type: actionTypes.MAKE_ORDER_SUCCESS, order: orderData, id: orderId }

}
export const makeOrderFails = (err) => {
    return { type: actionTypes.MAKE_ORDER_FAILED, error: err }
}
export const makeOrderInit = () => {
    return { type: actionTypes.MAKE_ORDER_INIT }
}



export const makeOrder = (orderData) => {
    console.log(orderData)
    return (dispatch) => {
        dispatch(makeOrderStart())
        instance.post('/order.json', orderData)
            .then(res => {
                console.log(res)
                dispatch(makeOrderSucces(orderData, res.data.name))
            })
            .catch(err => {
                console.log(err)
                dispatch(makeOrderFails(err))
            }
            )
    }
}

// => makeOrder()(dispatch)