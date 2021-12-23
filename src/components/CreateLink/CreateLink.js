import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Input } from '../Input/Input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { httpLinkPost } from '../Api/utils/utils';
import AuthProvider from '../Api/Auth/AuthProvider';
import { Alert } from 'react-native';

const Wrapper = styled.View`
    padding: 10px;
    flex-direction: row;
    justify-content: space-between;
`
const InputWrapper = styled.View`
    margin: 10px
`
const InputDesWrapper = styled.View`
    width: 80%;
`

const IconWrapper = styled.TouchableOpacity`
    width: 60px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    paddingTop: ${props => props.padding || '7px'};
    backgroundColor: ${props => props.background || '#4d4fff'};
    height: 37px;
`



function CreateLink({ setLoading, setGetItem }) {

    const [newLink, setNewLink] = useState('')
    const [description, setDescription] = useState('')

    const handleAddLink = async () => {

        if(!newLink){
            Alert.alert(`The link field cannot be empty!`);
            return 
        }

        const params = {
            link: newLink,
            date: Date.now(),
            description: description
        }

        setLoading(true)

        await httpLinkPost(params)
            .then(res => {
                console.log('res:',res.data)
                setGetItem(true)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                AuthProvider.checkError(err)
            })
    }

    return (
        <>
            <InputWrapper>
                <Input
                    value={newLink}
                    setValue={e => setNewLink(e)}
                    placeholder="New link"
                    placeholderTextColor={'#a09e9e'}
                />
            </InputWrapper>
            <Wrapper>
                <InputDesWrapper>
                    <Input
                        value={description}
                        setValue={e => setDescription(e)}
                        placeholder="Description"
                        placeholderTextColor={'#a09e9e'}
                    />
                </InputDesWrapper>
                <IconWrapper
                    background={'#6b1dfa'}
                    padding={'2px'}
                    onPress={handleAddLink}
                >
                    <MaterialCommunityIcons name="plus-circle-outline" color={'#fff'} size={20} />
                </IconWrapper>
            </Wrapper>
        </>
    );
}

export default CreateLink;