import { StatusBar } from 'expo-status-bar';
import React from 'react';
import  styled  from 'styled-components/native';
import { Container } from './src/components/globalComponents/globalComponents';
import MainComponents from './src/navigate';


export default function App() {

  return (
       <MainComponents isAuth={false} />
  );
}
