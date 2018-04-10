import { Navbar, Button, Row, Col } from 'react-bootstrap'
import React, { Component } from 'react'
import  Pseudo from './Pseudo.jsx'

export default class Home extends Component {
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

