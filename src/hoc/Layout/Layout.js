import React, { Component } from 'react'
import Auxilary from '../Auxilary/Auxilary'
import SideDrawer from '../../componets/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../componets/Navigation/Toolbar/Toolbar'
import classes from './Layout.css'
class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }
    sideDrawerToggleHandler = (prevState) => {
        this.setState(() => { return { showSideDrawer: !prevState.showSideDrawer } })
    }
    render() {
        return (
            <Auxilary>
                <Toolbar opened={this.sideDrawerToggleHandler} />
                <SideDrawer SideDrawerStatus={this.state.showSideDrawer} opened={this.sideDrawerToggleHandler} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilary>
        )
    }
}

export default Layout
