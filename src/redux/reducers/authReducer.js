import { getItem } from "../../hooks/useStorage";
import { EDIT_AUTH } from "../types/types";

const initialState = {
    isAuth: getItem('isAuth') === 'true' ? true : false,
    token: getItem('token') || '',
    user: getItem('currentUser', true) || {
        name: '',
        email: '',
        avatar: '',
        id: ''
    },
}

export const authReducer = (state = initialState, action ) => {
    switch (action.type) {
        case EDIT_AUTH: 
            return {...state, isAuth: action.payload.isAuth, user: action.payload.user, token: action.payload.token}
    
        default:
            return state;
    }
}