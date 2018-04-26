import { combineReducers } from 'redux'

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
                email:'',
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
                        return Object.assign({}, state, action.payload, { isGetting: false})
                case 'REQUEST_SET_USER':
                        return {...state,
                                isSetting: true
                        }
                case 'RECEIVE_SET_USER':
                        debugger;
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
