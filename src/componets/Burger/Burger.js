import React from 'react'
import BurgerIngredient from './BurgerIngridients/BurgerIngridients'
import classes from './Burger.css'
import { withRouter } from 'react-router-dom'

const Burger = (props) => {
    console.log(props)
    let transformedIngredients = Object.keys(props.ingredients)
        .map(item => [...Array(props.ingredients[item])].map((_, i) => <BurgerIngredient key={item + i} type={item} />))
        .reduce((a, b) => a.concat(b))
    transformedIngredients.length === 0 && (transformedIngredients = <p>Please start enter ingridients</p>)
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default withRouter(Burger) 
