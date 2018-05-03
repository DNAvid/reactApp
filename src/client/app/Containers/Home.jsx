import React from 'react'
import UserGetDetail from './UserGetDetail.jsx'
import UserDetails from './UserDetails.jsx'
import UserDelete from './UserDelete.jsx'
import {connect} from 'react-redux'

const mapStateToProps = (state)=>({
	user:  state.user
})

const mapDispatchToProps = (dispatch)=>({
})

class HomeNC extends React.Component {

	render() {
		var {
			isGetting,
			isSetting,
			isInitialized
		} = this.props.user

		console.log('isGetting  & isSetting', [isGetting, isSetting].join(' ')) 
		return (
			<div className='container'>
				{ !isInitialized  &&
				<UserGetDetail/>
				}
				{ isGetting && !isSetting && 
				<h4> Checking for personal info you entered previously...</h4>
				}
				{ !isGetting && !isSetting && 
				<UserDetails /> 
				}
				{!isGetting && isSetting && 
				<h4>
					Storing your personal information...
				</h4>
				}
				<div>
					<h4>Download or delete my Data</h4>
					<UserDelete/>
				</div>
			</div>
			)
	}
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeNC)
export default Home 
