import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components/native'
import { Container, StyledButton } from '../../components/globalComponents/globalComponents'

const LoginContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;

const LoginWrapper = styled.View`
    background: #fff;
    height: 100%;
    width: 100%;
    shadow-color: #000;
    shadow-opacity: 0.23;
    elevation: 4;
`;

export default function Login() {
    return (
        <LoginContainer>
                <LoginWrapper></LoginWrapper>
        </LoginContainer>
    )
}


