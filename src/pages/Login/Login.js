import React, { useState } from 'react'
import styled from 'styled-components/native'
import AuthProvider from '../../components/Api/Auth/AuthProvider';
import { StyledButton } from '../../components/globalComponents/globalComponents'
import { Input } from '../../components/Input/Input';
import Back from '../../../assets/back-login.png'

const LoginContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background: #fff;
`;

const BackgroundImage = styled.ImageBackground`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const LoginWrapper = styled.View`
    padding: 10px;
    width: 80%;
`;

const InputWrapper = styled.View`
    padding: 10px 0px;
`;

const image = {uri: '../../../assets/back-login.png'}


export default function Login() {

    const [value, setValue] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handlePress = async () => {

        AuthProvider.login(value)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log('err::', err)
            })
    }

    return (
        <LoginContainer>
              <BackgroundImage source={Back} resizeMode="cover">
            <LoginWrapper>
                <InputWrapper>
                    <Input
                        value={value.name}
                        setValue={e => setValue({ ...value, name: e })}
                        placeholder="Login"
                        placeholderTextColor="#fff"
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input
                        value={value.email}
                        setValue={e => setValue({ ...value, email: e })}
                        placeholder="Email"
                        keyboardType="email-address"
                        placeholderTextColor="#fff"
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input
                        value={value.password}
                        setValue={e => setValue({ ...value, password: e })}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="#fff"
                    />
                </InputWrapper>
                <StyledButton
                    title="Submit"
                    onPress={handlePress}
                />
            </LoginWrapper>
            </BackgroundImage>
        </LoginContainer>
    )
}


