import React, { Component } from 'react'
import { Navbar, Button, Row, Col } from 'react-bootstrap'

export default class Pseudo extends Component {
        render() {
        return <Row>
                <Col xs={6} sm={5} md={4} lg={2}>
                        <h4>Choose your Pseudo</h4>
                        <Button type="submit"> Choose</Button>
                </Col>
        </Row>
        }
}




