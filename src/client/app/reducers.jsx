import { combineReducers } from 'redux'
import {REQUEST_PSEUDO, RECEIVE_PSEUDO, TRY_SET_PSEUDO, CONFIRM_SET_PSEUDO
} from './actions.jsx'

// Reducer to refactor
export const reducer = (state = [], action) => {
        switch (action.type) {
                case 'SET_PSEUDO':
                        return [
                                ...state,
                                {
                                        pseudo: action.pseudo,
                                }
                        ]
                default:
                        return state
        }
}
/////// END



//const chosenPseudo= (state = '', action) => {
//        switch (action.type) {
//                case SELECT_SUBREDDIT:
//                        return action.subreddit
//                default:
//                        return state
//        }
//}

//const posts = (state = {
//        isFetching: false,
//        didInvalidate: false,
//        items: []
//}, action) => {
//        switch (action.type) {
//                case INVALIDATE_SUBREDDIT:
//                        return {
//                                ...state,
//                                didInvalidate: true
//                        }
//                case REQUEST_POSTS:
//                        return {
//                                ...state,
//                                isFetching: true,
//                                didInvalidate: false
//                        }
//                case RECEIVE_POSTS:
//                        return {
//                                ...state,
//                                isFetching: false,
//                                didInvalidate: false,
//                                items: action.posts,
//                                lastUpdated: action.receivedAt
//                        }
//                default:
//                        return state
//        }
//}
//
//const postsBySubreddit = (state = { }, action) => {
//        switch (action.type) {
//                case INVALIDATE_SUBREDDIT:
//                case RECEIVE_POSTS:
//                case REQUEST_POSTS:
//                        return {
//                                ...state,
//                                [action.subreddit]: posts(state[action.subreddit], action)
//                        }
//                default:
//                        return state
//        }
//}

//const rootReducer = combineReducers({
//        reducer
//})

//export default rootReducer
// export default reducer

