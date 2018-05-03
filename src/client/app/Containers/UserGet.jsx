import React from 'react'
import {getUser} from '../actions.jsx'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


const mapStateToProps = state  => ({
	isRegistered: state.session.isRegistered,
	id_token: state.session.id_token
})

const mapDispatchToProps = dispatch => ({
	getUser: id_token => dispatch(getUser(id_token))

})

class UserGetNC extends React.Component{ 

	render()
	{
		this.props.getUser(this.props.id_token)
		var isRegistered = this.props.isRegistered 	
		return (
			<div className='container'>
				{ isRegistered &&
				<h4>	Looking for your pseudo, if you have registered one...
				</h4>
				}
				{!isRegistered &&
				<h4>	
					Looking for your pseudo. If you haven't registered a pseudo, you will be able to choose one..
				</h4>
				}
			</div>
			)
	}
}

const UserGet = connect(mapStateToProps, mapDispatchToProps)(UserGetNC)

export default UserGet
