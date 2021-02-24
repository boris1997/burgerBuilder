import React from 'react'
/* import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import BurgerBuilder from '../../../containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../../../containers/Checkout/Checkout'; */
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
const NavigationItems = () => {

    return (

        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' > Burger Builder </NavigationItem>
           {/*  <NavigationItem link='/Checkout' > Checkout</NavigationItem> */}
            <NavigationItem link='/Orders' > Orders</NavigationItem>
        </ul>

    )
}

export default NavigationItems
