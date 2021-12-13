import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async(key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log('storage set error', e)
    }
}

export const getItem = async(key, obj=false) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            if(obj){
                return JSON.parse(value)
            }
            return value
        }
    } catch (e) {
        console.log('storage get error', e)
    }
}

export const clearStorage = async () => {
    await AsyncStorage.clear();
}
