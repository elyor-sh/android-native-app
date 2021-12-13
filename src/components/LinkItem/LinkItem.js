import React from 'react'
import { Alert, Linking } from 'react-native'
import styled from 'styled-components/native'

const Wrapper = styled.View`
    background: #fff;
    width: 100%;
`

const Link = styled.Text`
    color: #1d58f8;
    width: 60%;
    padding: 10px 5px;
`

export default function LinkItem({ link, id, description, date }) {

    const handlePressLink = async (link) => {
        const supported = await Linking.canOpenURL(link);

        if(supported){
           await Linking.openURL(link)
        }else {
            Alert.alert(`Don't know how to open this link: ${link}`);
        }
    }

    return (
        <Wrapper>
            <Link
                numberOfLines={1}
                onPress={() => handlePressLink(link)}
            >
                {link}
            </Link>
        </Wrapper>
    )
}
