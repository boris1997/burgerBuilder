import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import classes from './Toolbar.css'

const Toolbar = (props) => (
   
    <header className={classes.Toolbar} >
        <DrawerToggle clicked={props.opened} />
        <Logo height='80%' />
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)


export default Toolbar
