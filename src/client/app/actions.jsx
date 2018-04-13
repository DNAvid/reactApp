import { Redirect } from 'react-router';
import axios from 'axios';

// Session
export const setSession = authResult => {
        authResult.expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime()); 
        // persist locally in case of reload
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', authResult.expiresAt);
        return ({
                type:'SET_SESSION',
                authResult
        })
}

export const logout = () => {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');

        return({type: 'LOGOUT'})
}

// User
const requestPseudo = () => { 
        return {type: 'REQUEST_PSEUDO'}
}

const receivePseudo = (pseudo) => { 
        return {type: 'RECEIVE_PSEUDO', pseudo: pseudo}
}

export function fetchPseudo(id_token) {
        return function (dispatch) {
                 dispatch(requestPseudo(id_token))
        return axios({
                        baseURL: 'https://wt-davidweiss-dnavid_com-0.run.webtask.io/dnavidDBAPI.js',
                        url: 'testForNewUser',
                        method: 'get',
                        headers: {
                                'Authorization': 'Bearer ' +  id_token,
                        }
                })
                .then(
                        res => {
                                const pseudo = res.data._id
                                return pseudo
                                // do some checks here for undefined pseudo or on the next .then?

                        },
                        error => console.log('An error occurred.', error)   
                )
                .then(pseudo => {
                        if (typeof pseudo !==  'undefined'){
                                dispatch(receivePseudo(pseudo))
                        }else{
                                dispatch(receivePseudo(''))
                        }
                }
                )
        }
}
        
//export const setUser = props => {
//        axios({
//                baseURL: 'https://wt-davidweiss-dnavid_com-0.run.webtask.io/dnavidDBAPI.js',
//                url: 'updateUser.js',
//                params: {
//                        category: props.category,
//                        key: props.key,
//                        text: props.text,
//                        json: props.json
//                },
//                method: 'post',
//                headers: {
//                        Authorization: 'Bearer ' +  localStorage.id_token
//                }
//        })
//}
