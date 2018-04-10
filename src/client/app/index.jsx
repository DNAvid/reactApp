import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import  { render } from 'react-dom'
import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom'
//import loading from './loading.svg'
import  Auth  from './Auth.js'
import { getUser, setUser, createUser,
        setPseudo, InitSetPseudoThunk} from './actions.jsx'
import { reducer } from './reducers.jsx'
import {FieldGroup} from './components.jsx'
import { App, Home, Wallet, Callback} from './containers.jsx'

import createHistory from 'history/createBrowserHistory'
const history = createHistory()


// Create store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

const auth = new Auth();
const handleAuthentication = ({location}) => {
        if (/access_token|id_token|error/.test(location.hash)) {
                console.log('launching auth handleAuth')
                auth.handleAuthentication();
        }

}
render(
        <Provider store={store}>
                <BrowserRouter >
                        <div>
                                <Route path="/" render={(props) => <App store={store} auth={auth} {...props} />} />
                                <Switch>
                                        <Route path="/home" render={(props) => <Home  store={store} auth={auth} {...props}/>} /> 
                                        <Route path="/wallet" render={(props) => <Wallet store={store} auth={auth} {...props}/>} /> 
                                        <Route path="/callback" render={(props) => {
                                                handleAuthentication(props);
                                                return <Callback store={store} auth={auth} {...props} /> }}
                                        />
                                        <Redirect from='*' to='/' />
                                </Switch>
                        </div>
                </BrowserRouter>
        </Provider>,
        document.getElementById('root')
);

