import React, { Component } from 'react'
import { InitSetPseudo } from '../actions.jsx'

export default class Callback extends Component {
        componentDidMount(){
                if(localStorage.id_token){this.props.store.dispatch(initSetPseudo(localStorage.id_token))}
        
        }
        render() {

                return (

                <div className='container'> 
                        Loading...
                </div>
                );
        }
}

