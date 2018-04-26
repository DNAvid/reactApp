import { Alert, Panel, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Row, Col, Grid, Image } from 'react-bootstrap'
import React from 'react'
import { AlertDismissable, SetProfilePicture, SetProfileBio, SetProfileDetails } from '../components.jsx'


class Home extends React.Component {
        constructor(props)
        {
                super(props)
                this.handleDelete = this.handleDelete.bind(this)
        }

        handleDelete(e) {
                e.preventDefault()
                this.props.deletePseudo(this.props.session.id_token, this.props.session.pseudo)
                return false
        }
        componentWillMount() { 
                this.props.getUserDetail(this.props.session)
        }

        render() {

                var {
                        isGetting,
                        isSetting,
                        firstName,
                        lastName,
                        email,
                        phone,
                        picture,
                        bio
                } = this.props.user

                var pseudo = this.props.session.pseudo


                return (

                <div className='container'>
                        { isGetting && !isSetting && (
                                <h4> Checking for personal info you entered previously...</h4>
                        )}
                        { !isGetting && !isSetting && (
                                        <SetProfileDetails 
                                                pseudo    = {pseudo} 
                                                bio       = {bio}
                                                firstName = {firstName}
                                                lastName  = {lastName}
                                                email     = {email}
                                                phone     = {phone}
                                                setUserDetail={this.props.setUserDetail}/> 
                        )}
                        {!isGetting && isSetting && (
                                <h4>
                                        Storing your personal information...
                                </h4>
                        )}
                        <div>
                                <h4>Download or delete my Data</h4>
                                <AlertDismissable handleDelete={this.handleDelete}/>
                        </div>
                </div>
                )
        }
}

export default Home 
