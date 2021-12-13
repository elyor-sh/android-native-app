import React from 'react';
import { Provider } from 'react-redux';
import MainComponents from './src/navigate';
import { store } from './src/redux';


export default function App() {

  return (
    <Provider store={store}>
      <MainComponents />
    </Provider>
  );
}
