import React, { Component } from 'react'
import Auxilary from '../../../hoc/Auxilary/Auxilary'
import Backdrop from '../Backdrop/Backdrop'

import classes from './Modal.css'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.show, this.props.show)
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    /*  com */

    render() {
        return (
            <Auxilary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={{
                        transform: (this.props.show && !this.props.btnStatus) ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: (this.props.show && !this.props.btnStatus) ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxilary>
        )
    }
}


export default Modal
