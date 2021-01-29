import React, { Component } from 'react'
import Modal from '../../componets/UI/Modal/Modal'
import Auxilary from '../Auxilary/Auxilary'


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }


        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log(error)
                this.setState({ error: error })
                /* return error */
            })
        }

        componentWillUnmount() {
            console.log('will unmount', this.reqInterceptor, this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorCofirmesHandler = () => {
            this.setState({ error: null })
        }
        render() {
            console.log('ok')
            return (
                <Auxilary>
                    <Modal show={this.state.error} modalClosed={this.errorCofirmesHandler}>{this.state.error ? this.state.error.message : null}</Modal>
                    <WrappedComponent {...this.props} />
                </Auxilary>
            )
        }
    }
}

export default withErrorHandler