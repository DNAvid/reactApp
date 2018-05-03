import { combineReducers } from 'redux'

export function session(state = 
	{
		isAuthenticated: false,
		isInitialized: false,
		isRegistered: false,
		isFetching: false,
		pseudo: ''
		}, 
	action) {
	switch(action.type) {
                case 'SET_SESSION':
                        return {...state, 
                                access_token: action.authResult.accessToken,
                                id_token: action.authResult.idToken,
                                expires_at: action.authResult.expiresAt,
                                isAuthenticated: true
                        };
                case 'LOGOUT':
                        return {...state, 
                                access_token: '',
                                id_token: '',
                                expires_at: '',
                                isAuthenticated: false,
                                pseudo: ''
                        };
                case 'REQUEST_DELETE_PSEUDO':
                        return {...state,
                                isDeleting: true
                        }
                case 'RECEIVE_DELETE_PSEUDO':
                        return {...state,
                                isDeleting: false,
                                isRegistered: false,
                                pseudo: ''
                        }
                case 'REQUEST_SET_PSEUDO':
                        return {...state,
                                isSetting: true,
                        }
                case 'RECEIVE_SET_PSEUDO':
                        return {...state,
                                isAvailable: action.isAvailable,
                                pseudo: action.pseudo,
                                isSetting: false,
                                isRegistered: true
                        }
                case 'REQUEST_PSEUDO':
                        return {...state,
                                isFetching: true
                        }
                case 'RECEIVE_PSEUDO':
                        return {...state,
				pseudo: action.pseudo, 
				isRegistered: action.pseudo != '' ? true : false,
				isInitialized: true,
                                isFetching: false}
				
                default:
                        return state;
        }
}

export function user(
        state = {
                picture:'',
		files: '',
                bio:'',
                firstName:'',
                lastName:'',
                phone:'',
                email:'',
                isInitialized: false,
                isGetting: false,
                isSetting: false
        },
        action
) {
        switch (action.type) {
                case 'REQUEST_GET_USER':
                        return {...state,
                                isGetting: true
                        }
                case 'RECEIVE_GET_USER':
                        return Object.assign({}, state, action.payload, { isGetting: false, isInitialized: true})
                case 'REQUEST_SET_USER':
                        return {...state,
                                isSetting: true
                        }
                case 'RECEIVE_SET_USER':
                        return Object.assign({}, state, action.payload, {isSetting: false})
                default:
                        return state
        }
}

const rootReducer = combineReducers({
        session,
        user 
})

export default rootReducer;
