import instance from "../../axios-orders"
import * as actionTypes from '../actions/actionTypes'

export const getOrder = (token) => {
    return (dispatch) => {
        dispatch(getOrderStart())
        console.log(token)
        instance.get(`/order.json?auth=${token}`)
            .then(res => {
                console.log(res)
                dispatch(getOrderSuccess(res.data))

            })
            .catch(err => {
                dispatch(getOrderFailed(err))

            })
    }
}

export const getOrderStart = () => {
    return ({ type: actionTypes.GET_ORDER_START })
}

export const getOrderSuccess = (data) => {
    return ({ type: actionTypes.GET_ORDER_SUCCESS, order: data })
}

export const getOrderFailed = (err) => {
    return ({ type: actionTypes.GET_ORDER_FAILED })
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