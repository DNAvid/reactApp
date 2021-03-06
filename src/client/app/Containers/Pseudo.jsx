import React, { Component } from 'react'
import { Alert, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setPseudo } from '../actions.jsx'
import { FieldGroup } from '../components.jsx'
import { Redirect} from 'react-router-dom'

const mapStateToProps = state => (
	{ 
		isRegistered: state.session.isRegistered, 
		isAvailable: state.session.isAvailable,
		id_token: state.session.id_token, 
		isSetting: state.session.isSetting,
		pseudo: state.session.pseudo
	})
const mapDispatchToProps = ({setPseudo: setPseudo})

class PseudoNC extends React.Component {
        constructor(props) {
                super(props);
                this.handleChange = this.handleChange.bind(this);
                this.handleSubmit= this.handleSubmit.bind(this);
                this.state = {
                        value: ''
                };
        }

        handleSubmit(e){
                e.preventDefault()
                this.props.setPseudo(this.props.id_token, this.state.value)
                return false
        }
        handleChange(e) {
                this.setState({ value: e.target.value });
        }
        render() {
                return (
                        <div>
				{ this.props.isRegistered  &&
				<Redirect to='/home'/>
				}
                                <form onSubmit={this.handleSubmit}>
                                        <FormGroup
                                                controlId="formBasicText"
                                        >
                                                <ControlLabel>If you wish to start adding personal information, choose your nickname</ControlLabel>
                                                <FormControl
                                                        type="text"
                                                        value={this.state.value}
                                                        placeholder="HealthyPrimate"
                                                        onChange={this.handleChange}
                                                />
                                                <HelpBlock>For better anonymity, you may not reveal your real name.</HelpBlock>
                                        </FormGroup>
                                        <Button type='submit'>
                                                Get {this.state.value}
                                        </Button>
                                </form>
                                { this.props.isSetting === true && (
                                        <Alert> Checking for availability: {this.state.value} </Alert>
                                
                                )}
                                { this.props.isAvailable === true &&  (
                                        <Alert> It is available and set: {this.state.value} </Alert>
                                
                                )}
                                { this.props.isAvailable === false && this.props.isSetting === false  &&  (
                                        <Alert> Sorry but {this.state.value} is not available. Please try another one.</Alert>
                                
                                )}
                        </div>
                );
        }
}


const Pseudo = connect(mapStateToProps, mapDispatchToProps)(PseudoNC) 
export default Pseudo;
