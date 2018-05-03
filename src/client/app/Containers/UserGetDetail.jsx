import React from 'react'
import {getUserDetail} from '../actions.jsx'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


const mapStateToProps = state  => ({
	isGetting: state.user.isGetting
})

const mapDispatchToProps = dispatch => ({
	getUserDetail: id_token => dispatch(getUserDetail())

})

class UserGetDetailNC extends React.Component{ 

	render()
	{
		this.props.getUserDetail()
		var isGetting = this.props.isGetting 	
		return (
			<div>
				{ isGetting &&
				<h4>	Looking for your personal info.
				</h4>
				}
				{!isGetting &&
				<div></div>
				}
			</div>
			)
	}
}

const UserGetDetail = connect(mapStateToProps, mapDispatchToProps)(UserGetDetailNC)

export default UserGetDetail
