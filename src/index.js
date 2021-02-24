import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import burgerBuilder from './store/reducers/burgerBuilder';
import order from './store/reducers/order';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

/* const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose */


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware Dispatching]', store.getState())
            console.log('[Middleware Dispatching]', next)
            console.log('[Middleware Dispatching]', action)
            const result = next(action);
            console.log('[Middleware next state]', store.getState(), next, action)
            console.log(result)
            return result;
        }
    }
}

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilder,
    order: order
})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)))

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
