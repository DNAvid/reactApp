import { Alert, Panel, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Row, Col, Grid, Image } from 'react-bootstrap'
import React, { Component } from 'react'

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
// Presentation component template
//const FieldGroup = (id, label, help, ...props) => {
//        return (<FormGroup controlId={id}>
//                <ControlLabel>{label}</ControlLabel>
//                <FormControl {...props} />
//                {help && <HelpBlock>{help}</HelpBlock>}
//        </FormGroup>)
//}

export class AlertDismissable extends React.Component {
        constructor(props, context) {
                super(props, context);

                this.handleDismiss = this.handleDismiss.bind(this);
                this.handleShow = this.handleShow.bind(this);
                this.handleDelete = this.props.handleDelete.bind(this);

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




export class SetProfileDetails extends React.Component {
        constructor(props) {
                super(props)
                if (typeof this.props.bio === 'undefined') {
                        console.log("bio is undefined")
                        this.state = {
                                bio: "",
                                firstName:"", 
                                lastName :"",
                                phone:"",
                                email:"", 
                                picture: false,
                                helpMessage: "Choose picture",
                                files: undefined

                        }
                } else {
                        this.state = {
                                "bio": this.props.bio,
                                "firstName": this.props.firstName,
                                "lastName": this.props.lastName,
                                "phone": this.props.phone,
                                "email": this.props.email
                        }
                }
                this.handleChangeFile = this.handleChangeFile.bind(this)
                this.handleSubmitFile = this.handleSubmitFile.bind(this)
                this.handleChange = this.handleChange.bind(this)
                this.handleSubmit = this.handleSubmit.bind(this)
        }


        handleChangeFile(event) {
                this.setState({
                        files: event.target.files,
                        helpMessage: "Uploading " + event.target.files[0].name
                })
        }

        handleSubmitFile(event) {
                var data = new FormData();
                data.append('file', this.state.files[0]);
                var config = {
                        onUploadProgress: function(progressEvent) {
                                var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                        },
                        params:{
                                pseudo:this.props.pseudo,
                                key:"profilePicture"
                        },
                        headers: {
                                Authorization: "Bearer " + localStorage.id_token 
                        }
                };

                axios.put('https://wt-davidweiss-dnavid_com-0.run.webtask.io/transferFiles.js', data, config)
                        .then(function (res) {
                                this.setState({ "helpMessage":"File uploaded"})
                        })
                        .catch(function (err) {
                                this.setState({ "helpMessage":"oh, snap!"})

                        });
        }

        handleChange(event) {
                this.setState({
                        [event.target.name]: event.target.value
                })

        }

        handleSubmit(){

                var obj= {
                        ['bio']:this.state.bio,
                        ['firstName']:this.state.firstName,
                        ['lastName']:this.state.lastName,
                        ['phone']:this.state.phone,
                        ['email']:this.state.email,
                        ['picture']:this.state.picture

                }
                
                var path = 'user'

                this.props.setUserDetail(path=path, obj=obj)}

        render() {
                const pseudo = this.props.pseudo
                return (
                        <div>
                                <Row >
                                        <Col xs={3} sm={2} md={2} lg={2}>
                                                <Image src={this.state.picture||"https://storage.googleapis.com/dnavid/egg.png"} thumbnail />
                                        </Col>
                                        <Col xs={9} sm={10} md={10} lg={10}><h1>
                                                        {pseudo}
                                                </h1> 
                                        </Col>
                                </Row>
                                <Row>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                                <form onSubmit={this.handleSubmitForm}>
                                                        <FormGroup controlId='formControlFile'>
                                                                <ControlLabel>{'Upload your picture'}</ControlLabel>
                                                                <FormControl type='file' onChange={this.handleChangeForm}/>
                                                                {this.state.helpMessage && <HelpBlock>{this.state.helpMessage}</HelpBlock>}
                                                        </FormGroup>
                                                        <Button type="submit"> Change Picture </Button>
                                                </form>
                                        </Col>
                                </Row>
                                <Row>
                                        <Col xs={8} sm={8} md={5} lg={4}>
                                                <form onSubmit={this.handleSubmit}>
                                                        <FieldGroup 
                                                                style={{minHeight:100}}
                                                                id="formControlsTextarea"
                                                                componentClass="textarea"
                                                                name="bio"
                                                                type="textarea"
                                                                label="Bio"
                                                                placeholder="Why I'm interested in DNA. Is there something that runs in my family that could be due to DNA. Max. 120 characters."
                                                                value={this.state.bio}
                                                                onChange={this.handleChange}
                                                        />
                                                        <Button type='submit'> Update bio </Button>
                                                </form>
                                        </Col>
                                </Row>
                                <Row>
                                        <Col xs={6} sm={6} md={3} lg={3}>
                                                <h4>Personal Details</h4>
                                                <form onSubmit={this.handleSubmit}>
                                                        <FieldGroup
                                                                id="formControlsText"
                                                                name="firstName"
                                                                type="text"
                                                                label="First Name"
                                                                placeholder="First name"
                                                                value={this.state.firstName}
                                                                onChange={this.handleChange}
                                                        />
                                                        <FieldGroup
                                                                id="formControlsText"
                                                                name="lastName"
                                                                type="text"
                                                                label="Last Name"
                                                                placeholder="Last name"
                                                                value={this.state.lastName}
                                                                onChange={this.handleChange}
                                                        />
                                                        <FieldGroup
                                                                id="formControlsText"
                                                                type="text"
                                                                name="phone"
                                                                label="Phone"
                                                                placeholder="Phone"
                                                                value={this.state.phone}
                                                                onChange={this.handleChange}
                                                        />
                                                        <FieldGroup
                                                                id="formControlsText"
                                                                name="email"
                                                                type="email"
                                                                label="email"
                                                                placeholder="Email"
                                                                value={this.state.email}
                                                                onChange={this.handleChange}
                                                        />
                                                        <Button type="submit"> Update details</Button>
                                                </form>
                                        </Col>
                                </Row>
                        </div>
                )
        }
}

