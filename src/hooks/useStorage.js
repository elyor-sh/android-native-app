import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

export const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log('storage set error', e)
    }
}

export const getItem = async (key, obj = false) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            if (obj) {
                return JSON.parse(value)
            }
            return value
        }
    } catch (e) {
        console.log('storage get error', e)
    }
}

export const clearStorage = async (navigation) => {

    const dispatch = useDispatch()

    await AsyncStorage.clear();

    dispatch(
        {
            type: EDIT_AUTH,
            payload:
            {
                isAuth: false,
                user: {
                    name: '',
                    email: '',
                    avatar: '',
                    id: ''
                },
                token: ''
            }
        })

    if (navigation) {
        navigation.navigate('Login')
    }

    return false

}
