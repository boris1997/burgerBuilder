import React, { Component } from 'react'
import Input from '../../componets/UI/Input/Input';
import Button from '../../componets/UI/Button/Button';
import Spinner from '../../componets/UI/Spinner/Spinner';
import classes from '../../containers/Checkout/ContactData/ContactData.css';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';

class Auth extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {

                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedAuthForm = {
            ...this.state.authForm,
            [inputIdentifier]: {
                ...this.state.authForm[inputIdentifier],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.authForm[inputIdentifier].validation),
                touched: true
            }
        };
        let formIsValid = true;
        for (let inputIdentifier in updatedAuthForm) {
            formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ authForm: updatedAuthForm, formIsValid: formIsValid });

    }

    authHandler = (event) => {
        event.preventDefault();
        console.log(this.state.authForm.email)
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            console.log(prevState)
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {
        console.log(this.state.formIsValid)
        let form = (
            <form onSubmit={this.authHandler} className={classes.ContactData} >
                { Object.entries(this.state.authForm).map(item => <Input changedInput={(e) => { this.inputChangedHandler(e, item[0]) }} key={item[0]} elementType={item[1].elementType} valid={item[1].valid} touched={item[1].touched} shouldValidate={item[1].validation} elementConfig={item[1].elementConfig} value={item[1].value} />)}
                {/*  <Input elementType="..." elementConfig="..." value="..." />
                <Input inputtype='input' type="email" name="email" placeholder="Your Mail" />
                <Input inputtype='input' type="text" name="street" placeholder="Street" />
                <Input inputtype='input' type="text" name="postal" placeholder="Postal Code" /> */}
                <Button btnType="Success" disabled={!this.state.formIsValid} /* clicked={this.orderHandler} */>SUBMIT</Button>
            </form>

        );
        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMassage = null
        if (this.props.error) {
            console.log(this.props.error)
            errorMassage = <p>{this.props.error}</p>
        }
        return (
            <div className={classes.Auth}>
                {errorMassage}
                {form}
                <Button btnType="Danger" clicked={this.switchAuthModeHandler} /* clicked={this.orderHandler} */>Switch to {this.state.isSignup ? 'signin' : 'signup'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, method) => dispatch(actions.auth(email, password, method))
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
