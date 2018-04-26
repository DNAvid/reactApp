import { Panel, Jumbotron, PageHeader, Label, NavDropdown, MenuItem, NavItem, Nav, Navbar, Button, Row, Col } from 'react-bootstrap'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

class Login extends Component {
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
                this.props.login()
        }

        logout() {
                this.props.logout()
        }

        render() {
                const isAuthenticated = this.props.isAuthenticated
                return (
                        <Row>
                                <Col xs={0.5} sm={1} md={1.5} lg={2}></Col>


                                <Col xs={11} sm={10} md={9} lg={8}>


                                        <Jumbotron>
                                                <Row>
                                                        <Col xs={0.5} sm={1} md={1.5} lg={2}></Col>


                                                        <Col xs={11} sm={10} md={9} lg={8}>

                                                                <h1>How much is my health worth?</h1>
                                                                <p>
                                                                        DNA-ID associates your DNA to a bitcoin wallet that you own and use to participate in the new health economy.
                                                                </p>
                                                                <Link to='/splash/learnmore'>Learn more </Link>
                                                        </Col>
                                                        <Col xs={0.5} sm={1} md={1.5} lg={2}></Col>
                                                </Row>
                                        </Jumbotron>
                                </Col>
                                <Col xs={0.5} sm={1} md={1.5} lg={2}></Col>
                        </Row>
                );
        };
};

export default Login

