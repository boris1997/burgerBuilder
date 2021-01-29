import React, { Component } from 'react'
import instance from '../../axios-orders'
import Order from '../../componets/Order/Order'
import Spinner from '../../componets/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state = {
        orders: null,
        loading: true
    }
    componentDidMount() {
        instance.get('/order.json').then(res => this.setState({ orders: res.data, loading: false })).catch(err => this.setState({ loading: false }))
    }
    render() {
        let order = <Spinner />
        if (!this.state.loading && this.state.orders) {
            order = Object.entries(this.state.orders).map(item => <Order key={item[0]} customer={item[1].customer} ingredients={item[1].ingredients} price={item[1].price} />)
        }

        return (
            <div>
                {order}
            </div>
        )
    }
}

export default withErrorHandler(Orders, instance) 
