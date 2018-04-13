import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import  { render } from 'react-dom'
import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router-dom'
import history from './history'
//import loading from './loading.svg'
import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0_variables'

import  App from './Containers/App.jsx'
import  Home from './Containers/Home.jsx'
import  Wallet from './Containers/Wallet.jsx'
import  Callback from './Containers/Callback.jsx'

import  rootReducer  from './reducers.jsx'
import { setSession, fetchPseudo } from './actions.jsx'

var webAuth = new auth0.WebAuth({
        domain: AUTH_CONFIG.domain,
        clientID: AUTH_CONFIG.clientId,
        redirectUri: AUTH_CONFIG.callbackUrl,
        audience: `https://${AUTH_CONFIG.domain}/userinfo`,
        responseType: 'token id_token',
        scope: 'openid'
});
// From Auth0 React samples

// Create store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, 
        composeEnhancers(applyMiddleware(thunk)));

// Handle authentication
const handleAuthentication = ({location}) => {
        if (/access_token|id_token|error/.test(location.hash)) {
                webAuth.parseHash((err, authResult) => {
                        if (authResult && authResult.accessToken && authResult.idToken) {
                                store.dispatch(setSession(authResult));
                                store.dispatch(fetchPseudo(authResult.idToken))
                                history.replace('/home');
                        } else if (err) {
                                history.replace('/home');
                                console.log(err);
                                alert(`Error: ${err.error}. Check the console for further details.`);
                        }
                });

        }
}

render(
        <Provider store={store}>
                <Router history={history}>
                        <div>
                                <Route path="/" render={(props) => <App webAuth={webAuth} {...props} />} />
                                <Route path="/home" render={(props) => <Home webAuth={webAuth} store={store} {...props}/>} /> 
                                <Route path="/wallet" render={(props) => <Wallet webAuth={webAuth} {...props}/>} /> 
                                <Route path="/callback" render={(props) => {
                                        handleAuthentication(props);
                                        return <Callback {...props} /> }} />
                        </div>
                </Router>
        </Provider>,
        document.getElementById('root')
);

