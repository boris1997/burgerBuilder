import React, { Component } from 'react'
import Button from '../../../componets/UI/Button/Button'
import classes from './ContactData.css'
import instance from '../../../axios-orders'
import Spinner from '../../../componets/UI/Spinner/Spinner'
import Input from '../../../componets/UI/Input/Input'

class ContactData extends Component {

    state = {
        OrderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        const formData = {};
        for (let formElementIdentifier in this.state.OrderForm) {
            formData[formElementIdentifier] = this.state.OrderForm[formElementIdentifier].value;
            console.log(formData)
            /*  console.log(this.state.OrderForm[formElementIdentifier])
             console.log(formData[formElementIdentifier])
             console.log(formElementIdentifier) */
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData

        }
        instance.post('/order.json', order).then(response => {
            this.props.history.push('/');
            this.setState({ loading: false/* , showModal: false */ })
        }).catch(error => this.setState({ loading: false/* , showModal: false  */ }))
    }

    checkValidity = (value, rules) => {
        console.log(rules)
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) { isValid = value.trim().length >= 5 && isValid }
        if (rules.maxLength) { isValid = value.trim().length <= 5 && isValid }
        return isValid;
    }

    inputChangedHandler = (e, item) => {
        const updatedForm = { ...this.state.OrderForm };
        const updatedFormElement = { ...updatedForm[item] }
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[item] = updatedFormElement
        console.log(updatedForm)
        const valid = Object.values(updatedForm).every(item => item.valid)
       
      /*   console.log(this.state.formIsValid) */
        // const ValueArray = Object.entries(formUpdated).filter(el => el[0] === item /* && (el[1].value = e.target.value) */);
        // const ValueArrayUpdated = [...ValueArray]
        // ValueArrayUpdated.map(item => item[1].value = e.target.value)
        this.setState({ OrderForm: updatedForm, formIsValid: valid })
    }


    render() {
        console.log(this.state.formIsValid)
        let form = (
            <form onSubmit={this.orderHandler} className={classes.ContactData} >
                { Object.entries(this.state.OrderForm).map(item => <Input changedInput={(e) => { this.inputChangedHandler(e, item[0]) }} key={item[0]} elementType={item[1].elementType} valid={item[1].valid} touched={item[1].touched} shouldValidate={item[1].validation} elementConfig={item[1].elementConfig} value={item[1].value} />)}
                {/*  <Input elementType="..." elementConfig="..." value="..." />
                <Input inputtype='input' type="email" name="email" placeholder="Your Mail" />
                <Input inputtype='input' type="text" name="street" placeholder="Street" />
                <Input inputtype='input' type="text" name="postal" placeholder="Postal Code" /> */}
                <Button btnType="Success" disabled={!this.state.formIsValid} /* clicked={this.orderHandler} */>ORDER</Button>
            </form>

        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div>
                {form}
            </div>
        )
    }
}

export default ContactData
