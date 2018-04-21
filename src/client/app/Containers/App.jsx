import { Well, Jumbotron, PageHeader, Label, NavDropdown, MenuItem, NavItem, Nav, Navbar, Button, Row, Col } from 'react-bootstrap'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

class App extends Component {
        constructor()
        {
                super()
                this.login = this.login.bind(this)
                this.logout = this.logout.bind(this)
        }

        goTo(route) {
                this.props.history.replace(`/${route}`)
        }

        login() { this.props.login() }

        logout() { this.props.logout() }

        render() {
                const isAuthenticated = this.props.isAuthenticated
                return (
                                <Navbar collapseOnSelect>
                                        <Navbar.Header>
                                                <Navbar.Brand>
                                                        <Navbar.Text>
                                                                <Link to="">DNA\/ID</Link>
                                                        </Navbar.Text>
                                                </Navbar.Brand>
                                                <Navbar.Toggle />
                                        </Navbar.Header>
                                        <Navbar.Collapse>
                                                <Nav pullRight>
                                                        {
                                                                !isAuthenticated && 
                                                                <NavItem>   <Button
                                                                                id="qsLoginBtn"
                                                                                style={{marginLeft: '7px',marginTop: '5px'}}
                                                                                bsStyle="primary"
                                                                                onClick={this.login.bind(this)}>
                                                                                Log In
                                                                        </Button>
                                                                </NavItem>
                                                        }
                                                        {
                                                                isAuthenticated && 
                                                                <div>
                                                                        <Nav>
                                                                                <NavItem><Navbar.Text pullRight><Link to='/home'>Home</Link></Navbar.Text></NavItem>
                                                                                <NavItem><Navbar.Text pullRight><Link to='/wallet'>Wallet</Link></Navbar.Text></NavItem>
                                                                        </Nav>
                                                                        <Nav>
                                                                                <NavItem>
                                                                                        <Button
                                                                                                id="qsLogoutBtn"
                                                                                                style={{marginLeft: '7px',marginTop: '5px'}}
                                                                                                bsStyle="primary"
                                                                                                onClick={this.logout.bind(this)}>
                                                                                                Log Out 
                                                                                        </Button>
                                                                                </NavItem>
                                                                        </Nav>
                                                                </div>
                                                        }
                                                </Nav>
                                        </Navbar.Collapse>
                                </Navbar>
                );
        };
};

export default  App;
