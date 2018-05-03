import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import  { render } from 'react-dom'
import React, { Component } from 'react'
import { Router, Route, Link, Redirect } from 'react-router-dom'
import history from './history'
//import loading from './loading.svg'

import  App from './Containers/App.jsx'
import  Home from './Containers/Home.jsx'
import  Wallet from './Containers/Wallet.jsx'
import  { Login, LearnMore } from './Containers/Login.jsx'
import  Pseudo from './Containers/Pseudo.jsx'
import Logout from './Containers/Logout.jsx'
import Callback from './Containers/Callback.jsx'
import UserGet from './Containers/UserGet.jsx'

import  rootReducer  from './reducers.jsx'

import { 
	trySetSessionFromLocalStorage,
	logout,
	login
} from './actions.jsx'

import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0_variables'

var webAuth = new auth0.WebAuth({
	domain: AUTH_CONFIG.domain,
	clientID: AUTH_CONFIG.clientId,
	redirectUri: AUTH_CONFIG.callbackUrl,
	audience: `https://${AUTH_CONFIG.domain}/userinfo`,
	responseType: 'token id_token',
	scope: 'openid'
})

// Create state management store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, 
	composeEnhancers(applyMiddleware(thunkMiddleware)));

const mapStateToProps = (state, props) => ({
	user: state.user,
	session: state.session
})

const mapDispatchToProps =(dispatch)=>({
	setSession: (args)=> dispatch(setSession(args)),
	getUser: (args)=>dispatch(getUser(args)),
	trySetSessionFromLocalStorage:()=>dispatch(trySetSessionFromLocalStorage())
})
class RedirectToAuth0 extends React.Component{
	render(){	
		this.props.webAuth.authorize()
		return (null)
	}
}

class ContainerNC extends React.Component {

	componentWillMount(){
		if (typeof localStorage.getItem('expires_at') !== 'undefined' && 
			JSON.parse(localStorage.getItem('expires_at')) > new Date().getTime()){

			this.props.trySetSessionFromLocalStorage()
		}	
		var {
			isAuthenticated,
			isRegistered,
			isFetching,    
			id_token,
		} = this.props.session
		if(isAuthenticated && !isRegistered ){
			this.props.getUser(id_token)
		}
	}


	render(){
		var {

			store,
			history,
			webAuth
		} = this.props

		var {
			isAuthenticated,
			isInitialized,
			isRegistered,
			isFetching,    
			id_token      
		} = this.props.session

		return (
			<Provider store={store}>
				<Router history={history}>
					<div>
						<Route path="/" render={ () => <App/>} />
						<Route path="/" exact={true} render={ () => <Login/>}  />
						<Route path="/splash" render={ () => <Login/>} />
						<Route path="/splash/learnmore" exact={true} render={() => <LearnMore/>} />
						<Route path="/callback" render= { () => <Callback webAuth={webAuth}/>}/>
						<Route path="/login" render= { () => <RedirectToAuth0 webAuth={webAuth}/>}/>
						<Route path='/logout' render= { () => <div><Logout/><Redirect to='/'/></div>}/>

						{ !isInitialized && <UserGet/> }

						{ !isAuthenticated && <Route path="/home" render={()=><h4>There is no personal info of you.</h4>} />}

						{ isAuthenticated  &&
						<div>

							{ isRegistered &&
							<div>
								<Route path="/home" render={ () => <Home/>}/>
								<Route path="/wallet" render={ () => <Wallet/>}/> 
							</div>}
							{ !isRegistered && isInitialized && !isFetching &&
							<div>
								<Route path="/home" render={ props => <Redirect to='/pseudo'/>}/>
							</div>
							}

						</div>
						}
						<Route path='/pseudo' render= { () => <Pseudo/>}/>
					</div>
				</Router>
			</Provider>
			)
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(ContainerNC)

render(
	<Container webAuth={webAuth} history={history} store={store}/>,
	document.getElementById('root')
);

