import { clearStorage, getItem, setItem } from '../../../hooks/useStorage'
import { httpLoginPost } from '../utils/utils'

const AuthProvider =  {
    login:(value) => {
        return(
            httpLoginPost(value)
                .then(res => {
                    return res.data
                })
                .then(jsonData => {
                    const currentUser = {
                        userId: jsonData.userId,
                        userName: jsonData.userName,
                        userAvatar: jsonData.avatar,
                        userEmail: jsonData.userEmail,
                    }
                    setItem('currentUser', JSON.stringify(currentUser))
                    setItem('token', jsonData.token)
                    return jsonData
                })
                .catch(err => {
                    throw new Error(err)
                })
        )
    },
    checkError: async (error, navigation) => {
        console.log('auth', error)
        if(error && error.status && error.status === 401){
           await clearStorage(navigation)
        }
        return Promise.reject()
    },
}

export default AuthProvider