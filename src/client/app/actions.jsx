import axios from 'axios'
// User DB API using webtasks and and Mongo DB
export const getUser = (id_token) =>  axios({
        baseURL: 'https://wt-davidweiss-dnavid_com-0.run.webtask.io/dnavidDBAPI.js',
        url: 'testForNewUser',
        method: 'get',
        headers: {
                'Authorization': 'Bearer ' +  id_token,
        }
})

export const setUser = props => {
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
                        Authorization: 'Bearer ' +  localStorage.id_token
                }
        })
}

export var setPseudo = pseudo => ({type:'SET_PSEUDO', pseudo})

export var initSetPseudo = id_token =>{
        return function(dispatch){
                return getUser(id_token).then(
                        res => {
                                console.log('pseudo is:', res.data._id); 
                                dispatch(setPseudo(res.data._id))
                        },
                        console.log('error in API endpoint.')
                )}
}
