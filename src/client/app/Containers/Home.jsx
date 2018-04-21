import { Alert, Panel, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Row, Col, Grid, Image } from 'react-bootstrap'
import React from 'react'
import { AlertDismissable, SetProfilePicture, SetProfileBio, SetProfileDetails } from '../components.jsx'


class Home extends React.Component {
        constructor(props)
        {
                super(props)
                this.handleDelete = this.props.handleDelete.bind(this)
        }

        handleDelete(e) {
                e.preventDefault()
                this.props.deletePseudo(this.props.session.id_token, this.props.session.pseudo)
                return false
        }

        componentWillMount(){
                this.props.getUserDetail('user') 
        
        }
        handleSubmit(userDetails){
                this.props.setUserDetail(userDetails) 
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
                                
                                <div>
                                        <h4>Public profile</h4>
                                        { isGetting && !isSetting && (
                                                <h4>Checking for your personal info...</h4>
                                        ) }
                                        { !isGetting && !isSetting &&
                                        <SetProfilePicture 
                                                pseudo={pseudo} 
                                                setUserDetail={setUserDetail}/>
                                        <SetProfileBio 
                                                bio={bio}
                                                setUserDetail={setUserDetail}/>
                                        <SetProfileDetails 
                                                firstName= {firstName}
                                                lastName = {lastName}
                                                email    = {email}
                                                phone    = {phone}
                                                setUserDetail={setUserDetail}
                                        />}
                                        {!isGetting && isSetting && (
                                                <h4>Remembering your personal information...</h4>)}
                                        <h4>Download and delete my Data</h4>
                                        <AlertDismissable handleDelete={this.handleDelete}/>
                                </div>
                                }


                        </div>
                );
        }
}

export default Home 
