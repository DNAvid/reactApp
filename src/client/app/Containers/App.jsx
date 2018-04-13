import { Navbar, Button, Row, Col } from 'react-bootstrap'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions.jsx'

const MapStateToProps = state => ( {isAuthenticated: state.session.isAuthenticated})

const MapDispatchToProps = {logout: logout}
      
class AppNC extends Component {
        constructor()
        {
                super()
                this.login = this.login.bind(this)
                this.logout = this.logout.bind(this)
        }

        goTo(route) {
                this.props.history.replace(`/${route}`)
        }

        login() {
                this.props.webAuth.authorize()
        }


        
        logout() {
                this.props.logout()
        }

        render() {
                const isAuthenticated = this.props.isAuthenticated
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
                                                        onClick={this.goTo.bind(this,'home')}>

                                                        Home

                                                </Button>

                                                <Button
                                                        style={{marginLeft: '7px',marginTop: '5px'}}
                                                        bsStyle="primary"
                                                        onClick={this.goTo.bind(this,'wallet')}>

                                                        Wallet

                                                </Button>


                                                {
                                                        !isAuthenticated && 
                                                        <Button
                                                                id="qsLoginBtn"
                                                                style={{marginLeft: '7px',marginTop: '5px'}}
                                                                bsStyle="primary"
                                                                onClick={this.login.bind(this)}>

                                                                Log In

                                                        </Button>

                                                }
                                                {
                                                        isAuthenticated && 
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
        };
};

const App = connect(
        MapStateToProps,
        MapDispatchToProps
)(AppNC)

export default  App
