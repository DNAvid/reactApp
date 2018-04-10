import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { Navbar, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'

export class Pseudo extends Component{ render(){return<div>Ree</div>}}

export class App extends Component {
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
                console.log('auth in App:', isAuthenticated)
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
                                                        onClick={this.goTo.bind(this, 'home')}>

                                                        Home

                                                </Button>

                                                <Button
                                                        style={{marginLeft: '7px',marginTop: '5px'}}
                                                        bsStyle="primary"
                                                        onClick={this.goTo.bind(this, 'wallet')}>

                                                        Wallet

                                                </Button>


                                                {
                                                        !isAuthenticated() && 
                                                                <Button
                                                                        id="qsLoginBtn"
                                                                        style={{marginLeft: '7px',marginTop: '5px'}}
                                                                        bsStyle="primary"
                                                                        onClick={this.login.bind(this)}>

                                                                        Log In

                                                                </Button>
                                                        
                                                }
                                                {
                                                        isAuthenticated() && 
                                                                <Button
                                                                        id="qsLogoutBtn"
                                                                        style={{marginLeft: '7px',marginTop: '5px'}}
                                                                        bsStyle="primary"
                                                                        onClick={this.logout.bind(this)}>
                                                                        Log Out
                                                                </Button>
                                                        
                                                }
                                        </Navbar.Header>
                                </Navbar>
                        </div>

                );
        }
}

export class Home extends Component {
        login() {
                this.props.auth.login();
        }
        render() {
                const  {isAuthenticated}  = this.props.auth
                return (
                        <div className='container'>
                                {isAuthenticated() &&  
                                <div
                                ><h4>Hi dude!</h4>
                                <Pseudo auth={this.props.auth} store={this.props.store}/>
                        </div>
                        }
                                {/* { isAuthenticated() &&                                
                                }
                               */}
                                { !isAuthenticated() && 
                                <h4>
                                        You are not logged in. Please{' '}
                                        <a
                                                style={{ cursor: 'pointer' }}
                                                onClick={this.login.bind(this)}
                                        >
                                                Log In
                                        </a>
                                        {' '}to continue.
                                </h4>
                                }
                        </div>
                );
        }
}

export class Wallet extends Component {

        constructor(props){
                super(props)
                this.state = {walletBalance: 'Loading ...',
                        addressBalance: 'Loading...'}
        }

        componentWillMount() {

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

export class Callback extends Component {
          render() {

                      return (
                                    <div>
                                            Loading...
                                                          </div>
                                  );
                    }
}

