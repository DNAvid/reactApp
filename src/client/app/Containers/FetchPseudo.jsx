import React from 'react'
import {fetchPseudo} '../actions.jsx'
import {connect} from 'react-redux-dom'

mapStateToProps = state  => ({
id_token: id_token
}= state)

mapDispatchToProps = dispatch => ({
	fetchPseudo: id_token => dispatch(fetchPseudo(id_token) )

})

class UserGet extends React.Component{ 

	conponentWillMount(){
			this.props.userGet(this.props.id_token)}
	}

	render()
	{
		
		<h4>	Looking for your pseudo, if you have registered one... </h4>
	}
}
