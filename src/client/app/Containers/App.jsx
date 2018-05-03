import {  NavDropdown, MenuItem, NavItem, Nav, Navbar, Button, Row, Col } from 'react-bootstrap'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

const mapStateToProps= (state)=>({
	isAuthenticated: state.session.isAuthenticated})
const mapDispatchToProps=(dispatch)=>({
})
class AppNC extends Component {
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
								<NavItem><Navbar.Text pullRight><Link to='/login'>Login</Link></Navbar.Text></NavItem>
                                                        }
                                                        {
                                                                isAuthenticated && 
                                                                <div>
                                                                        <Nav>
                                                                                <NavItem><Navbar.Text pullRight><Link to='/home'>Home</Link></Navbar.Text></NavItem>
                                                                                <NavItem><Navbar.Text pullRight><Link to='/wallet'>Wallet</Link></Navbar.Text></NavItem>
                                                                        </Nav>
                                                                        <Nav>
										<NavItem><Navbar.Text pullRight><Link to='/logout'>Logout</Link></Navbar.Text></NavItem>
                                                                        </Nav>
                                                                </div>
                                                        }
                                                </Nav>
                                        </Navbar.Collapse>
                                </Navbar>
                );
        };
};
const App = connect(mapStateToProps, mapDispatchToProps)(AppNC)
export default  App;
