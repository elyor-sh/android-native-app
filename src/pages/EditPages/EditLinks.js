import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import AuthProvider from '../../components/Api/Auth/AuthProvider';
import { httpLinkPut, httpLinksGetById } from '../../components/Api/utils/utils';
import { Input } from '../../components/Input/Input';

const Container = styled.View`
    padding: 10px;
`

const TextBtn = styled.Text`
    color: #fff;
`

const InputWrapper = styled.View`
    padding: 0px 0px 10px;
`

const ButtonWrapper = styled.View`
    padding: 20px 0px;
    flex-direction: row;
    justify-content: flex-end;
`

const StyledButton = styled.TouchableOpacity`
    width: 70px;
    height: 40px;
    background: ${props => props.background || '#000'};
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: ${props => props.marginRight || '0px'}
`

function EditLinks({ route, navigation }) {

    const { id } = route.params

    const [link, setLink] = useState({
        id: '',
        description: '',
        link: ''
    })

    const getLink = async () => {
        await httpLinksGetById(id)
            .then(res => {
                setLink({
                    id: res.data.items._id,
                    description: res.data.items.description,
                    link: res.data.items.link
                })
            })
            .catch(err => {
                AuthProvider.checkError(err, navigation)
            })
    }

    const handleSave = async () => {

        if(!link.link){
            Alert.alert(`The link field cannot be empty!`);
            return 
        }

        const params = {
            id: link.id,
            link: link.link,
            description: link.description,
            date: Date.now()
        }

        await httpLinkPut(params)
            .then(() => {
                Alert.alert(`The link is successfully updated`);
            })
            .catch(err => {
                AuthProvider.checkError(err, navigation)
            })
    }

    const handleBack = () => {
        navigation.navigate('Links', {
            updateLinks: true
        })
    }

    useEffect(() => {
        if (id) {
            getLink()
        }
    }, [id])

    return (
        <ScrollView>
            <Container>
                <InputWrapper>
                    <Input
                        value={link.link}
                        setValue={e => setLink({ ...link, link: e })}
                        placeholder='Link'
                         placeholderTextColor={'#a09e9e'}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Input
                        value={link.description}
                        setValue={e => setLink({ ...link, description: e })}
                        placeholder='Description'
                         placeholderTextColor={'#a09e9e'}
                    />
                </InputWrapper>
                <ButtonWrapper>
                    <StyledButton 
                        background="#acacac" 
                        marginRight="10px"
                        onPress={handleBack}
                    >
                        <TextBtn>
                            Back
                        </TextBtn>
                    </StyledButton>
                    <StyledButton 
                        background="#710bc5" 
                        onPress={handleSave}
                    >
                        <TextBtn>
                            Save
                        </TextBtn>
                    </StyledButton>
                </ButtonWrapper>
            </Container>
        </ScrollView>
    );
}

export default EditLinks;