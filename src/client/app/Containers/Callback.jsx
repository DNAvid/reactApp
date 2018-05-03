import { Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSession, fetchPseudo} from '../actions.jsx'
import { Link } from 'react-router-dom'

const mapStateToProps=(state, props)=>({isAuthenticated: state.session.isAuthenticated})

const mapDispatchToProps=(dispatch)=>({
	setSession:(args)=> dispatch(setSession(args))
})

class CallbackNC extends React.Component{
	
	componentWillMount(){
		if (/access_token|id_token|error/.test(location.hash)) {
			this.props.webAuth.parseHash((err, authResult) => {
				if (authResult && authResult.accessToken && authResult.idToken) {
					this.props.setSession(authResult);
				} else if (err) {
					console.log(err);
					alert(`Error: ${err.error}. Check the console for further details.`);
				}
			});
		}

	}
	render(){	
		var isAuthenticated = this.props.isAuthenticated
		return (
			<div>
			{ isAuthenticated &&
			<Redirect to='/home'/>
			}
		</div>
		)
	}
}
const Callback = connect(mapStateToProps, mapDispatchToProps)(CallbackNC)

export default Callback

