import { combineReducers } from 'redux'

// Reducer
export function session(state = 
        {
        isAuthenticated: false,
        isFetching: false,
        pseudo: ''}, 
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
                                access_token: action.text,
                                id_token: action.text,
                                expires_at: action.text,
                                isAuthenticated: false
                        };
                case 'REQUEST_DELETE_PSEUDO':
                        return {...state,
                                isDeleting: true
                        }
                case 'RECEIVE_DELETE_PSEUDO':
                        return {...state,
                                isDeleting: false,
                                wasDeleted: true,
                                pseudo: ''
                        }
                case 'REQUEST_SET_PSEUDO':
                        return {...state,
                                isSetting: true,
                        }
                case 'RECEIVE_SET_PSEUDO':
                        return {...state,
                                isSetting: false,
                                isAvailable: action.isAvailable,
                                wasDeleted: false,
                                pseudo: action.pseudo
                        }
                case 'REQUEST_PSEUDO':
                        return {...state,
                                isFetching: true
                        }
                case 'RECEIVE_PSEUDO':
                        return {...state,
                                isFetching: false,
                                pseudo: action.pseudo
                        }
                default:
                        return state;
        }
}

export function user(
        state = {
                picture:'',
                bio:'',
                firstName:'',
                lastName:'',
                phone:'',
                email:''
        },
        action
) {
        switch (action.type) {
                case 'REQUEST_GET_USER':
                        return {...state,
                                isGetting: true
                        }
                case 'RECEIVE_GET_USER':
                        return {...state,
                                firstName: action.firstName, 
                                lastName:  action.lastName,
                                email:     action.email,
                                phone:     action.phone,
                                picture:   action.picture,
                                bio:       action.bio,
                                isGetting: false
                        }
                case 'REQUEST_SET_USER':
                        return {...state,
                                firstName: action.firstName, 
                                lastName:  action.lastName,
                                email:     action.email,
                                phone:     action.phone,
                                picture:   action.picture,
                                bio:       action.bio,
                                isSetting: true
                        }
                case 'RECEIVE_SET_USER':
                        return {...state,
                                isSetting: false
                        }
                default:
                        return state
        }
}

const rootReducer = combineReducers({
        session,
        user 
})

export default rootReducer
