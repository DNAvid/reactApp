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

// Session persistence upon reload
export const setSessionFromLocalStorage = () => {
        var authResult = new Object();
        authResult.expiresAt = localStorage.getItem('expires_at');
        authResult.accessToken  = localStorage.getItem('access_token');
        authResult.idToken = localStorage.getItem('id_token');
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
// Un-registered: set pseudo
const requestSetPseudo = (pseudo) => { 
        return {type: 'REQUEST_SET_PSEUDO'}
}

const receiveSetPseudo = (pseudo, isAvailable) => { 
        return {type: 'RECEIVE_SET_PSEUDO', 
                pseudo: pseudo,
                isAvailable: isAvailable}
}

export function setPseudo(id_token, pseudo) {
        return function (dispatch) {
                dispatch(requestSetPseudo(pseudo))
                return axios({
                        baseURL: 'https://wt-davidweiss-dnavid_com-0.run.webtask.io/dnavidDBAPI.js',
                        url: 'createUser',
                        method: 'post',
                        params: {
                                pseudo: pseudo
                        },
                        headers: {
                                Authorization: 'Bearer ' + id_token
                        }
                })
                        .then(
                                
                                res => {
                                        let isAvailable
                                        if ( res.status === 201 ) { isAvailable = true }
                                        if ( res.status === 200 ) { isAvailable = false }
                                                
                                        return(isAvailable)
                                },
                                error => console.log('An error occurred.', error)   
                        )
                        .then(isAvailable => {
                                if (isAvailable){
                                        dispatch(receiveSetPseudo(pseudo, isAvailable))}else{
                                                dispatch(receiveSetPseudo('', isAvailable))
                                        }
                        }
                        )
        }
}


// Registered: request pseudo
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
        
// Delete user
const requestDeletePseudo = () => { 
        return {type: 'REQUEST_DELETE_PSEUDO'}
}

const receiveDeletePseudo = () => { 
        return {type: 'RECEIVE_DELETE_PSEUDO', 
                }
}

export function deletePseudo(id_token, pseudo) {
        return function (dispatch) {
                dispatch(requestDeletePseudo())
                return axios({
                        baseURL: 'https://wt-davidweiss-dnavid_com-0.run.webtask.io/dnavidDBAPI.js',
                        url: 'deleteUser',
                        method: 'post',
                        params: {
                                pseudo: pseudo
                        },
                        headers: {
                                Authorization: 'Bearer ' + id_token
                        }
                })
                        .then(
                                
                                res => {let ok
                                        if ( res.status === 201 ) { ok = true }
                                                
                                        return(ok)
                                },
                                error => console.log('An error occurred.', error)   
                        )
                        .then(ok => {
                                if (ok){
                                        dispatch(receiveDeletePseudo())}                       
                        }
                        )
        }
}

// Set user detail

const requestSetUserDetail = (category, subcategory, key, text, json) => { 
        return {type: 'REQUEST_SET_USER',
                [key.subkey]:val.subval,
        }
}

const receiveSetUserDetail = (success) => { 
        if (success){
        return {type: 'RECEIVE_SET_PSEUDO'}
        }
}

export function setUserDetail(obj, id_token) {

        return function (dispatch) {
                dispatch(requestSetUserDetail())

                return axios({
                        baseURL: 'https://wt-davidweiss-dnavid_com-0.run.webtask.io/dnavidDBAPI.js',
                        url: 'updateUserJSON',
                        method: 'post',
                        params: {
                                json : JSON.stringify(obj) 
                        },
                        headers: {
                                Authorization: 'Bearer ' + id_token
                        }
                })
                        .then(
                                
                                res => {let ok
                                        if ( res.status === 201 ) { ok = true }
                                                
                                        return(ok)
                                },
                                error => console.log('An error occurred.', error)   
                        )
                        .then(ok => {
                                if (ok){
                                        dispatch(receiveSetUserDetail())}                       
                        }
                        )
        }
}

// Get user detail

const requestGetUserDetail = () => { 
        return {type: 'REQUEST_GET_USER'}
}

const receiveGetUserDetail = (data) => { 
                return {type: 'RECEIVE_GET_USER',
                data}
}

export function getUserDetail(session) {

        return function (dispatch) {
                dispatch(requestGetUserDetail())

                return axios({
                        baseURL: 'https://wt-davidweiss-dnavid_com-0.run.webtask.io/dnavidDBAPI.js',
                        url: 'getUser',
                        method: 'get',
                        params: {
                                pseudo : session.pseudo
                        },
                        headers: {
                                Authorization: 'Bearer ' + session.id_token
                        }
                })
                        .then(
                                
                                res => {
                                        if ( res.status === 200 ){ 
                                                return(res.data)
                                        }
                                },
                                error => console.log('An error occurred.', error)   
                        )
                        .then( data => {
                                        dispatch(receiveGetUserDetail(data)) 
                        }
                        )
        }
}

