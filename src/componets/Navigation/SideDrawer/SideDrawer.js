import React from 'react'
import Auxilary from '../../../hoc/Auxilary/Auxilary'
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Backdrop/Backdrop'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'

const SideDrawer = (props) => {
    //... add css classes conditionally

    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.SideDrawerStatus) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    console.log(attachedClasses, props)
    return (
        <Auxilary>
            <Backdrop show={props.SideDrawerStatus} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo} >
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxilary>
    )
}

export default SideDrawer
