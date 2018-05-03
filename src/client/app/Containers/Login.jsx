import { Panel, Jumbotron, PageHeader, Label, NavDropdown, MenuItem, NavItem, Nav, Navbar, Button, Row, Col } from 'react-bootstrap'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export class Login extends Component {
	render(){
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

export class LearnMore  extends React.Component {
        render(){
                return(
                        <div className='container'>
                        <h1>Concepts</h1> 
                        <ol>
                                <li>DNA+Bitcoin</li>
                                                                        DNA-ID links your DNA to a bitcoin wallet that you own and use to participate in the new health economy.
                                <li>Human rights</li>
                        </ol>
                        <Link to='/'>Back</Link>
                        </div>
                )
        }
}



