import React, { Component } from 'react'
import { connect } from 'react-redux'
import instance from '../../axios-orders'
import Order from '../../componets/Order/Order'
import Spinner from '../../componets/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as orderCreators from '../../store/actions/index'

class Orders extends Component {
    state = {
        loading: true
    }
    componentDidMount() {
        console.log(this.props)
        this.props.onGetOrder(this.props.token)
    }
    render() {
        let order = <Spinner />
        console.log(this.props.orders)
        if (!this.props.loading /* && this.props.orders */) {
            order = Object.entries(this.props.orders).map(item => <Order key={item[0]} customer={item[1].orderData} ingredients={item[1].ingredients} price={item[1].price} />)
            console.log(order)
        }

        return (
            <div>
                {order}
            </div>
        )
    }
}


const mapStateToProps = state => {
    console.log(state)
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetOrder: (token) => { dispatch(orderCreators.getOrder(token)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, instance))
