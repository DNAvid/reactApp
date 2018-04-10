import axios from 'axios'
import { Navbar, Button, Row, Col } from 'react-bootstrap'
import React, { Component } from 'react'
import { InitSetPseudo } from './actions.jsx'
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
                const isRegistered = this.props.store.getState().pseudo
                return (
                        <div className='container'>
                                {isAuthenticated() && Boolean(isRegistered) && 
                                <h4>Hi {isRegistered}!</h4>
                                }
                                { isAuthenticated() && !Boolean(isRegistered) && 
                                <Pseudo />
                                }
                                { !isAuthenticated() && 
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
                                }
                        </div>
                );
        }
}

export class Pseudo extends Component {
        render() {
        return <Row>
                <Col xs={6} sm={5} md={4} lg={2}>
                        <h4>Choose your Pseudo</h4>
                        <Button type="submit"> Choose</Button>
                </Col>
        </Row>
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
        componentDidMount(){
                if(localStorage.id_token){this.props.store.dispatch(initSetPseudo(localStorage.id_token))}
        
        }
        render() {

                return (

                <div> 
                        Loading...
                </div>
                );
        }
}
