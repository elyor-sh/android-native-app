import React, { useState } from 'react'
import styled from 'styled-components/native'
import AuthProvider from '../../components/Api/Auth/AuthProvider';
import { StyledButton } from '../../components/globalComponents/globalComponents'
import { Input } from '../../components/Input/Input';
import Back from '../../../assets/back-login.png'
import { useDispatch } from 'react-redux';
import { EDIT_AUTH } from '../../redux/types/types';

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


export default function Login({navigation}) {

    const [value, setValue] = useState({
        name: '',
        email: '',
        password: ''
    })

    const dispatch = useDispatch()

    const handlePress = async () => {
        AuthProvider.login(value)
            .then(res => {
                const currentUser = {
                    id: res.userId,
                    name: res.userName,
                    avatar: res.avatar,
                    email: res.userEmail
                }
                dispatch({type: EDIT_AUTH, payload: {isAuth: true, user: currentUser, token: res.token }})
                navigation.navigate('Main')

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
                            color={"#fff"}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            value={value.email}
                            setValue={e => setValue({ ...value, email: e })}
                            placeholder="Email"
                            keyboardType="email-address"
                            placeholderTextColor="#fff"
                            color={"#fff"}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            value={value.password}
                            setValue={e => setValue({ ...value, password: e })}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor="#fff"
                            color={"#fff"}
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


