import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions.jsx'
import { Link } from 'react-router-dom'
const mapStateToProps=(state, props)=>({})
const mapDispatchToProps=(dispatch)=>({logout: ()=> dispatch(logout())})

class LogoutNC extends React.Component{
	constructor(){
		super()
	
	this.logout = this.logout.bind(this)
	}

	logout(){this.props.logout()}
	
	componentDidMount(){
		this.logout()
	}

	render(){	
		return (
			<h4>You've logged out. Go back <Link to='/'>home</Link></h4>
		)
	}
}
const Logout = connect(mapStateToProps, mapDispatchToProps)(LogoutNC)

export default Logout
