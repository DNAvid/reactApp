import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import  { render } from 'react-dom'
import React, { Component } from 'react'
import { Router, Route, Link, Redirect } from 'react-router-dom'
import history from './history'
//import loading from './loading.svg'
import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0_variables'

import  App from './Containers/App.jsx'
import  Home from './Containers/Home.jsx'
import  Wallet from './Containers/Wallet.jsx'
import  Callback from './Containers/Callback.jsx'
import  Login from './Containers/Login.jsx'
import  Pseudo from './Containers/Pseudo.jsx'

import  rootReducer  from './reducers.jsx'
import { setSession, setSessionFromLocalStorage, fetchPseudo } from './actions.jsx'

// From Auth0 
var webAuth = new auth0.WebAuth({
        domain: AUTH_CONFIG.domain,
        clientID: AUTH_CONFIG.clientId,
        redirectUri: AUTH_CONFIG.callbackUrl,
        audience: `https://${AUTH_CONFIG.domain}/userinfo`,
        responseType: 'token id_token',
        scope: 'openid'
});

// Create state management store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, 
        composeEnhancers(applyMiddleware(thunk)));

// Use local session on reload
if (typeof localStorage.getItem('expires_at') !== 'undefined' && 
        JSON.parse(localStorage.getItem('expires_at')) > new Date().getTime()){
        store.dispatch(setSessionFromLocalStorage())
        store.dispatch(fetchPseudo(localStorage.getItem('id_token')))
}

// Handle after redirection from authentication service
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

class LearnMore  extends React.Component {
        render(){
                return(
                        <div>
                        <h1>Info</h1> 
                        <Link to='/'>Back</Link>
                        </div>
                )
        }
}

const mapStateToProps = state => ({
        session: state.session,
        user: state.user
})

const mapDispatchToProps = {
        deletePseudo: deletePseudo,
        setUserDetails: setUserDetail,
        getUserDetail: getUserDetail,
        logout: logout,
        login: ()=> {webAuth.Authorize()}
}

class ContainerNC extends React.Component {
        render(){
                // Dispatch=wrapped action creators
                var {
                        deletePseudo,
                        setUserDetail,
                        getUserDetail,
                        logout,
                        login
                }  = this.props
                // App level
                var {
                        store,
                        webAuth,
                        history,
                } = this.props

                var {
                        isAuthenticated,
                        id_token,      
                        isFetching,    
                        pseudo        
                } = this.props.session

                // Module-level
                var { user } = this.props.user

                const emptyPseudo =  !Boolean(pseudo.length) 
                if(
                 !isFetching && isAuthenticated && !emptyPseudo 
                ){this.props.getUserDetail(pseudo, id_token)}

                return (
                        <Provider store={store}>
                                <Router history={history}>
                                        <div>
                                                <Route path="/" render={(props) => 
                                                        <App 
                                                                login={login}
                                                                logout={logout}
                                                                isAuthenticated={isAuthenticated}
                                                        {...props} />} />
                                        <Route path="/" exact={true} render={(props) => 
                                                <Login 
                                                        login={login} 
                                                        logout={logout} 
                                                        isAuthenticated={isAuthenticated}
                                                        {...props} />}  />
                                        <Route path="/splash" render={(props) => 
                                                <Login 
                                                        login={login} 
                                                        logout={logout} 
                                                        isAuthenticated={isAuthenticated}
                                                        {...props} />} />
                                        <Route path="/splash/learnmore" exact={true} render={(props) => <LearnMore webAuth={webAuth} {...props} />} />

                                        { isFetching && 
                                
                                        <Route path="/home" render={(props) =>
                                        <h4>Retrieving your personal profile info (if you have created one).</h4> }/>}

                                                
                                        { !isFetching && isAuthenticated && emptyPseudo &&
                                        <Route path="/home" render={(props) =>
                                        <Pseudo /> }/>}

                                        { !isFetching && !isAuthenticated && 
                                        <Route path="/home" render={(props) =>
                                        <h4>
                                                You are not logged in! Please{' '}
                                                <a
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={this.login.bind(this)}
                                                >
                                                        Log In
                                                </a>
                                                {' '}to continue.
                                        </h4>
                                        }/>} 

                                        { !isFetching && isAuthenticated && !emptyPseudo &&
                                        <Route path="/home" render={(props) =>
                                                <Home 
                                                        user=  {user}
                                                        session= {session}
                                                        deletePseudo={deletePseudo}
                                                        {...props}/>} /> }

                                        <Route path="/wallet" render={(props) => 
                                                <Wallet 
                                                        user=  {user}
                                                        session= {session}
                                                {...props}/>} /> 
                                        <Route path="/callback" render={(props) => {
                                                handleAuthentication(props);
                                                return <Callback {...props} /> }} />
                                </div>
                        </Router>
                </Provider>
                )
        }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(ContainerNC)

render(
        <Container webAuth={webAuth} store={store} history={history}/>,
        document.getElementById('root')
);

