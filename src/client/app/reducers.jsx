import { combineReducers } from 'redux'

// Reducer
export function session(state = {isAuthenticated: false}, action) {
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
                default:
                        return state;
        }
}

export function user(
        state = {
                isFetching: false,
                pseudo: ''
        },
        action
) {
        switch (action.type) {
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
                        return state
        }
}


const rootReducer = combineReducers({
        session,
        user 
})

export default rootReducer
