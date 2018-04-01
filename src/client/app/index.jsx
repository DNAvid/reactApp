import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0_variables'
import  { render } from 'react-dom'
import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router-dom'
import { Navbar, Button } from 'react-bootstrap'
//import './index.css'
//import 'bootstrap/dist/css/bootstrap.css'
import history from './history'
//import loading from './loading.svg'
import axios from 'axios'

class Auth {
        constructor() {
                this.auth0 = new auth0.WebAuth({
                        domain: AUTH_CONFIG.domain,
                        clientID: AUTH_CONFIG.clientId,
                        redirectUri: AUTH_CONFIG.callbackUrl,
                        audience: `https://${AUTH_CONFIG.domain}/userinfo`,
                        responseType: 'token id_token',
                        scope: 'openid'
                });
                this.login = this.login.bind(this);
                this.logout = this.logout.bind(this);
                this.handleAuthentication = this.handleAuthentication.bind(this);
                this.isAuthenticated = this.isAuthenticated.bind(this);
        }

        login() {
                this.auth0.authorize();
        }

        handleAuthentication() {
                this.auth0.parseHash((err, authResult) => {
                        if (authResult && authResult.accessToken && authResult.idToken) {
                                this.setSession(authResult);
                                history.replace('/home');
                        } else if (err) {
                                history.replace('/home');
                                console.log(err);
                                alert(`Error: ${err.error}. Check the console for further details.`);
                        }
                });
        }

        setSession(authResult) {
                // Set the time that the access token will expire at
                let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('expires_at', expiresAt);
                // navigate to the home route
                history.replace('/home');
        }

        logout() {
                // Clear access token and ID token from local storage
                localStorage.removeItem('access_token');
                localStorage.removeItem('id_token');
                localStorage.removeItem('expires_at');
                // navigate to the home route
                history.replace('/home');
        }

        isAuthenticated() {
                // Check whether the current time is past the 
                // access token's expiry time
                let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
                return new Date().getTime() < expiresAt;
        }
}

const auth = new Auth();

const handleAuthentication = ({location}) => {
        if (/access_token|id_token|error/.test(location.hash)) {
                auth.handleAuthentication();
        }
}

class App extends Component {
        goTo(route) {
                this.props.history.replace(`/${route}`)
        }

        login() {
                this.props.auth.login();
        }

        logout() {
                this.props.auth.logout();
        }


        render() {
                const { isAuthenticated } = this.props.auth;


                return (
                        <div>
                                <Navbar fluid>
                                        <Navbar.Header>
                                                <Navbar.Brand>
                                                        <a href="#">DNA\/ID</a>
                                                </Navbar.Brand>

                                                <Button
                                                        style={{marginLeft: '7px',marginTop: '5px'}}
                                                        bsStyle="primary"
                                                        onClick={this.goTo.bind(this, 'home')}
                                                >

                                                Home

                                        </Button>

                                        <Button
                                                style={{marginLeft: '7px',marginTop: '5px'}}
                                                bsStyle="primary"
                                                onClick={this.goTo.bind(this, 'wallet')}
                                        >

                                        Wallet

                                </Button>

                                {
                                        !isAuthenticated() && (
                                                <Button
                                                        id="qsLoginBtn"
                                                        style={{marginLeft: '7px',marginTop: '5px'}}
                                                        bsStyle="primary"
                                                        onClick={this.login.bind(this)}
                                                >
                                                        Log In
                                                </Button>
                                        )
                                }
                                {
                                        isAuthenticated() && (
                                                <Button
                                                        id="qsLogoutBtn"
                                                        style={{marginLeft: '7px',marginTop: '5px'}}
                                                        bsStyle="primary"
                                                        className="btn-margin"
                                                        onClick={this.logout.bind(this)}
                                                >
                                                        Log Out
                                                </Button>
                                        )
                                }
                        </Navbar.Header>
                </Navbar>
        </div>
                );
        }
}

class Callback extends Component {
        render() {
                const style = {
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        height: '100vh',
                        width: '100vw',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                }

                return (

                <div style={style}>
                        Loading...
                </div>
                );
        }
}

class Home extends Component {
        login() {
                this.props.auth.login();
        }
        render() {
                const { isAuthenticated } = this.props.auth;
                return (
                        <div className="container">
                                {
                                        isAuthenticated() && (
                                                <h4>
                                                        You are logged in!
                                                </h4>
                                        )
                                }
                                {
                                        !isAuthenticated() && (
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
                                        )
                                }
                        </div>
                );
        }
}

class Wallet extends Component {

        constructor(props){
                    super(props)
                this.state = {walletBalance: 'Loading ...',
                addressBalance: 'Loading...'}
                  }

        componentDidMount() {

                function getWalletBalance(){
                        return axios({
                                url:'https://dnavidbitcoin.com/balance', 
                                method: 'get',
                                headers: {'Content-Type':'text/plain'}
                        }
                        )
                }

                function getAddressBalance(){
                        return axios({
                                url:'https://dnavidbitcoin.com/address.3NpQWeMPDnmiRwPs4j8q1cB7a5qNgLyAGy', 
                                method: 'get',
                                headers: {'Content-Type':'text/plain'}
                        }
                        )
                }
                axios.all([getWalletBalance(),getAddressBalance()])        
                        .then(axios.spread( (wBalance, aBalance) => {
                                this.setState({walletBalance: wBalance.data})
                                this.setState({addressBalance: aBalance.data})
                        }
                        )
                        ) 
        }

        login() {
                this.props.auth.login();
        }

        render() {
                const { isAuthenticated } = this.props.auth;
                return (
                        <div className="container">
                                {
                                        isAuthenticated() && (
                                                <h4>
                                                        You are logged in! This is your wallet balance: {this.state.addressBalance}. (total balance: {this.state.walletBalance}).
                                                </h4>
                                        )
                                }
                                {
                                        !isAuthenticated() && (
                                                <h4>
                                                        You are not logged in! Please{' '}
                                                        <a
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={this.login.bind(this)}
                                                        >
                                                                Log In
                                                        </a>
                                                        {' '}to see your wallet balance. (total balance: {this.state.walletBalance}).
                                                </h4>
                                        )
                                }
                        </div>
                );
        }
}



const makeMainRoutes = () => {
return (
        <Router history={history}>
                <div>
                        <Route path="/" render={(props) => <App auth={auth} {...props} />} />
                        <Route path="/home" render={(props) => <Home auth={auth} {...props}/>} /> 
                        <Route path="/wallet" render={(props) => <Wallet auth={auth} {...props}/>} /> 
                        <Route path="/callback" render={(props) => {
                                handleAuthentication(props);
                                return <Callback {...props} /> }}
                        />
                </div>
        </Router>
);
}

const routes = makeMainRoutes();

render(
        routes,
        document.getElementById('root')
);

