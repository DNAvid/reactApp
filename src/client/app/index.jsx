import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import  { render } from 'react-dom'
import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router-dom'
import history from './history'
//import loading from './loading.svg'
import { Fieldgroup } from './components.jsx'
import  Auth from './Containers/Auth.jsx'
import  App from './Containers/App.jsx'
import  Home from './Containers/Home.jsx'
import  Wallet from './Containers/Wallet.jsx'
import  Pseudo from './Containers/Pseudo.jsx'
import  Callback from './Containers/Callback.jsx'
import { profileReducer } from './reducers.jsx'

// Create store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(profileReducer, composeEnhancers(applyMiddleware(thunk)));


const auth = new Auth();

const handleAuthentication = ({location}) => {
        if (/access_token|id_token|error/.test(location.hash)) {
                auth.handleAuthentication();
        }

}
render(
        <Provider store={store}>
                <Router history={history}>
                        <div>
                                <Route path="/" render={(props) => <App store={store} auth={auth} {...props} />} />
                                <Route path="/home" render={(props) => <Home store={store} auth={auth} {...props}/>} /> 
                                <Route path="/wallet" render={(props) => <Wallet store={store} auth={auth} {...props}/>} /> 
                                <Route path="/callback" render={(props) => {
                                        handleAuthentication(props);
                                        return <Callback store={store} auth={auth} {...props} /> }}
                                />
                        </div>
                </Router>
        </Provider>,
        document.getElementById('root')
);

