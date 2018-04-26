import axios from 'axios';

// Session
export const setSession = authResult => {
        authResult.expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime()); 
        // persist locally in case of reload
        localStorage.setItem('access_token', JSON.stringify(authResult.accessToken));
        localStorage.setItem('id_token', JSON.stringify(authResult.idToken));
        localStorage.setItem('expires_at', JSON.stringify(authResult.expiresAt));
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
const requestSetUserDetail = () => { 
        return {type: 'REQUEST_SET_USER'
        }
}

const receiveSetUserDetail = (success, payload) => {
if (success){
                return {type: 'RECEIVE_SET_USER',
               payload }
        }
}

const initVars = function(fromNew, fromState, fromInit)  {

        var matches = [fromNew, fromInit, fromState]
        //Not empty
        .map(y => Object.keys(y).filter( x => y[x]!=="" && y[x]!= 'undefined'))
        // flatten
        .reduce((flat, toFlaten) => flat.concat(toFlaten),[])
        //unique
        .filter((v, i, a) => a.indexOf(v) === i); 


        var out = {};
        for (var i = 0; i <= matches.length-1; i++) {
                  var idx=matches[i]
                  
                  if (Object.keys(fromInit).map(x => x === idx ).reduce((x,y)=> y?x+y:x,0)>0){
                            
                             out[idx]=fromNew[idx] || fromState[idx] || fromInit[idx] }
        }
        return(out)
}

export function setUserDetail(path, obj) {
        return function (dispatch, getState) {
                var fromInit = { 
                        firstName: '',
                        lastName:  '', 
                        email:     '',    
                        phone:     '',    
                        picture:   '', 
                        bio:       ''
                }

                var moduleStore = 'user'

                var fromNew=obj
                var fromState=getState()[path]

                var hydratedData = initVars(
                        fromNew   =  fromNew, 
                        fromState =  fromState,
                        fromInit  =  fromInit)

                return axios({
                        baseURL: 'https://wt-davidweiss-dnavid_com-0.run.webtask.io/dnavidDBAPI.js',
                        url: 'updateUser',
                        method: 'post',
                        params: {
                                DBPath: path,
                                json: JSON.stringify(hydratedData)
                        },
                        headers: {
                                Authorization: 'Bearer ' + getState().session.id_token
                                
                        }
                })
                        .then(
                                
                                res => {
                                debugger; 
                                        if ( res.status === 201 ) { 
                                                var ok= true
                                        return(ok)}
                                },
                                error => console.log('An error occurred.', error)   
                        )
                        .then(
                                ok => { 
                                        if (ok) { 
                                                 
                                                debugger;                               
                                                dispatch( receiveSetUserDetail(ok, obj)) 
                                        }
                                }
                        )
        }
}

// Get user detail

const requestGetUserDetail = () => { 
        return {type: 'REQUEST_GET_USER'}
}

const receiveGetUserDetail = (payload) => { 
                return {type: 'RECEIVE_GET_USER',
                payload}
}

export function getUserDetail() {

        return function (dispatch, getState) {
                dispatch(requestGetUserDetail())
                var session = getState().session
                return axios({
                        baseURL: 'https://wt-davidweiss-dnavid_com-0.run.webtask.io/dnavidDBAPI.js',
                        url: 'getUser',
                        method: 'get',
                        params: {
                                pseudo : session.pseudo,
                                cat: 'user'
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
                                if (typeof data !== 'undefined' && data != '') {dispatch(receiveGetUserDetail(data)) }
                                else{
                                        var dataInit = {

                                        }
                                        dispatch(receiveGetUserDetail(dataInit))
                                }
                        }
                        )
        }
}

