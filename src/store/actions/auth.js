import axios from 'axios';
import * as actionTypes from '../actions/actionTypes'


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,

    }
}

export const authSucces = (idToken, userId) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId,

    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logOut = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logOut())
        }, `${expirationTime}000`)
    }

}
export const auth = (email, password, isSignup) => {

    return (dispatch) => {
        dispatch(authStart());
        console.log(isSignup)
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDYIh8ZDGOQe9oGNuEvgSd6TNh8mK12liU'
        isSignup && (url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDYIh8ZDGOQe9oGNuEvgSd6TNh8mK12liU');

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        console.log(authData)
        axios.post(url, authData)
            .then((res) => {
                console.log(res);
                dispatch(authSucces(res.data.idToken, res.data.localId))
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch(err => {
                console.log(err.response.data)
                dispatch(authFail(err.response.data.error.message))
            })
    }
}