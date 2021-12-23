import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import MainComponents from './src/navigate';
import { store } from './src/redux';


export default function App() {

  const token = AsyncStorage.getItem('token')

  useEffect(() => {
    console.log(token)
  }, [token])

  return (
    <Provider store={store}>
      <MainComponents />
    </Provider>
  );
}
