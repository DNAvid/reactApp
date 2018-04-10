// InitiaL state
const initialProfile = {
        pseudo: '' 
}

// Reducer
export function profileReducer(state = initialProfile, action) {
        switch(action.type) {
                case 'SET_PSEUDO':
                        return {...state, pseudo: action.pseudo};

                default:
                        return state;
        }
}

