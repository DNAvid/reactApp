import { Navbar, Button, Row, Col } from 'react-bootstrap'
import React, { Component } from 'react'

export default class App extends Component {
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
