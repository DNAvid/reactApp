import axios from 'axios'
import React, { Component } from 'react'
import {connect} from 'react-redux'

const MapStateToProps = state => ({isAuthenticated: state.session.isAuthenticated})

class WalletNC extends Component {

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
                this.props.webAuth.authorize();
        }

        render() {
                let isAuthenticated = this.props.isAuthenticated
                return (
                        <div className="container">
                                {
                                        isAuthenticated && (
                                                <h4>
                                                        You are logged in! This is your wallet balance: {this.state.addressBalance}. (total balance: {this.state.walletBalance}).
                                                </h4>
                                        )
                                }
                                {
                                        !isAuthenticated && (
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

const Wallet = connect(MapStateToProps)(WalletNC)
export default Wallet
