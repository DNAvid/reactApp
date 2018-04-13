import { connect } from 'react-redux'
import React, { Component } from 'react'
import  Pseudo from './Pseudo.jsx'

const MapStateToProps = state => ({
        isAuthenticated: state.session.isAuthenticated,
        isFetching: state.user.isFetching,
        pseudo: state.user.pseudo})

class HomeNC extends Component {
        constructor(props)
        {
                super(props)
                this.login = this.login.bind(this)
        }
        login() {
                this.props.webAuth.authorize();
        }
        render() {
                const  isAuthenticated  = this.props.isAuthenticated
                const  isFetching= this.props.isFetching
                const pseudo = this.props.pseudo
                const emptyPseudo =  !Boolean(pseudo.length) 
                return (
                        <div className='container'>
                                                { !isFetching && isAuthenticated && !emptyPseudo &&

                                                <h4>Hi {pseudo}!</h4>
                                                }
                                                { !isFetching && isAuthenticated && emptyPseudo &&
                                                <Pseudo />
                                                }
                                                { !isFetching && !isAuthenticated && 
                                                <h4>
                                                        You are not logged in! Please{' '}
                                                        <a
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={this.login.bind(this)}
                                                        >
                                                                Log In
                                                        </a>
                                                        {' '}to continue.
                                                </h4>
                                                }

                                        
                                </div>
                );
        }
}

const Home = connect(
        MapStateToProps
)(HomeNC)
export default Home 



{/*                                {isAuthenticated && isRegistered && typeof pseudo !== 'undefined' && 
                                <h4>Hi {pseudo}!</h4>
                                }
                                { isAuthenticated && !isRegistered && 
                                <Pseudo />
                                }
                                { !isAuthenticated && 
                               <h4>
                                        You are not logged in! Please{' '}
                                        <a
                                                style={{ cursor: 'pointer' }}
                                                onClick={this.login.bind(this)}
                                        >
                                                Log In
                                        </a>
                                        {' '}to continue.
                                </h4>
                                } */}
