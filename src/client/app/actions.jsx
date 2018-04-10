import axios from 'axios'

export const REQUEST_PSEUDO = 'REQUEST_PSEUDO'
export const RECEIVE_PSEUDO = 'RECEIVE_PSEUDO'
// only first time visitor 
export const CHOOSE_PSEUDO = 'CHOOSE_PSEUDO'
export const TRY_SET_PSEUDO = 'TRY_SET_PSEUDO'
export const CONFIRM_SET_PSEUDO = 'CONFIRM_SET__PSEUDO'
// User is registered or recognized, extra action to indicate this?

// User DB API using webtasks and and Mongo DB
const getUser = (id_token) =>  axios({
        baseURL: 'https://wt-davidweiss-dnavid_com-0.run.webtask.io/dnavidDBAPI.js',
        url: 'testForNewUser',
        method: 'get',
        headers: {
                'Authorization': 'Bearer ' +  id_token,
        }
})

const setUser = (id_token, props) => {
        axios({
                baseURL: 'https://wt-davidweiss-dnavid_com-0.run.webtask.io/dnavidDBAPI.js',
                url: 'updateUser.js',
                params: {
                        category: props.category,
                        key: props.key,
                        text: props.text,
                        json: props.json
                },
                method: 'post',
                headers: {
                        Authorization: 'Bearer ' +  id_token
                }
        })
}

const createUser = (id_token, pseudo) => {
        axios({
                baseURL: 'https://wt-davidweiss-dnavid_com-0.run.webtask.io/dnavidDBAPI.js',
                url: 'createUser',
                params: {
                        json: props.json
                },
                method: 'post',
                headers: {
                        Authorization: 'Bearer ' +  id_token
                }
        })
}

// Actions to refactor
const setPseudo = pseudo => ({
        type: 'SET_PSEUDO',
        pseudo
})


const InitSetPseudoThunk = (id_token) => {
        return  ({dispatch}, id_token) =>{
                return getUser(id_token).then(
                        res => {
                                console.log('pseudo is:', res.data._id); 
                                dispatch(setPseudo(res.data._id))
                        },
                        console.log('Allright.')
                )}
}

let SetPseudo =  ({ dispatch }) => {
        let input

        return (
                <div>
                        <form onSubmit={e => {
                                e.preventDefault()
                                if (!input.value.trim()) {
                                        return
                                }
                                dispatch(setPseudo(input.value))
                        }}>
                                <input ref={node => input = node} />
                                <button type="submit">
                                        Set pseudo
                                </button>
                        </form>
                </div>
        )
}
///// END
export const requestPseudo = token_id => ({
          type: REQUEST_PSEUDO,
          token_id
})

// Next two are the same async
export const receivePseudo = (token_id, json) => ({
          type: RECEIVE_PSEUDO,
          pseudo: json.data,
          receivedAt: Date.now()
})


const fetchPseudo = (token_id) => dispatch => {
          return getUser(token_id)
            .then(response => response.json())
            .then(json => dispatch(receivePseudo(json)))
}

// Not an action actually
const shouldChoosePseudo = (state, token_id) => {
          const pseudo = state.pseudo
          if (!pseudo) {
                      return true
                    }
          if (pseudo) {
                      return false
                    }
          return posts.didInvalidate
}

// action cascade, SELECT, REQUEST, RECEIVE
export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
          if (shouldFetchPosts(getState(), subreddit)) {
                      return dispatch(fetchPosts(subreddit))
                    }
}
