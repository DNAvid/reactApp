import { Alert, Button} from 'react-bootstrap'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deletePseudo } from '../actions.jsx'


const mapStateToProps = (state)=>({
	pseudo: state.session.pseudo,
	id_token: state.session.id_token

})


const mapDispatchToProps = (dispatch)=>({
	deletePseudo: (id_token, pseudo)=>dispatch(deletePseudo(id_token, pseudo))
})


export class UserDeleteNC extends React.Component {
        constructor(props, context) {
                super(props, context);

                this.handleDismiss = this.handleDismiss.bind(this);
                this.handleShow = this.handleShow.bind(this);
                this.handleDelete = this.handleDelete.bind(this);

                this.state = {
                        show: false
                };
        }


        handleDismiss() {
                this.setState({ show: false });
        }

        handleShow() {
                this.setState({ show: true });
        }
        handleDelete() {
		var id_token = this.props.id_token
		var pseudo = this.props.pseudo
		this.props.deletePseudo(id_token, pseudo)
        }

        render() {

                if (this.state.show) {
                        return (
                                <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                                        <h4>This action deletes all your data</h4>
                                        <p>
                                                You cannot undo this step
                                        </p>
                                        <p>
                                                <Button bsStyle="danger" onClick={this.handleDelete}> Delete my data</Button>
                                                <span> or </span>
                                                <Button onClick={this.handleDismiss}>Keep my data</Button>
                                        </p>
                                </Alert>
                        );
                }

                return <Button onClick={this.handleShow}>Delete my Info</Button>;
        }
}

const UserDelete = connect(mapStateToProps, mapDispatchToProps)(UserDeleteNC)
export default UserDelete 

function FieldGroup({
        id,
        label,
        help,
        ...props
}) {
        return (
                <FormGroup controlId={id}>
                        <ControlLabel>{label}</ControlLabel>
                        <FormControl {...props} />
                        {help && <HelpBlock>{help}</HelpBlock>}
                </FormGroup>
        );
}
