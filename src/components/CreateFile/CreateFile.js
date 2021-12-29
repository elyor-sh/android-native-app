import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { Input } from '../Input/Input';
import { httpFilesPost } from '../Api/utils/utils';
import AuthProvider from '../Api/Auth/AuthProvider';

const Wrapper = styled.View`
  padding: 10px;
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  paddingBottom: 10px;
`
const InputWrapper = styled.View`
  width: 70%;
`

const ButtonSave = styled.Button`

`
const ButtonAdd = styled.TouchableOpacity`
  color: #fff;
  backgroundColor: #952ff5;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 15px;
`

const TextWrapper = styled.Text`
  color: #fff;
`


function CreateFile({navigation, setFiles}) {

  const [description, setDescription] = useState('')
  const [file, setFile] = useState('')

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      console.log('result::', result)
      setFile(result)
    } catch (err) {
      Alert.alert(JSON.stringify(err || '["Download error"]'))
      throw err
    }
  }

  const handleSave = async () => {
    if(!file){
      Alert.alert('Please, add file!')
      return
    }

    const newFile = {
      uri: file.uri,
      type: file.mimeType,
      name: file.name,
    }

    let formData = new FormData()
    formData.append('file', newFile)
    formData.append('description', description)



    await httpFilesPost(formData)
      .then(res => {
        setFiles(res.data.items)
        setFile('')
        setDescription('')
      })
      .catch(err => {
        AuthProvider.checkError(err, navigation)
      })
  }

  return (
    <Wrapper>
    <Row>
      <InputWrapper>
        <Input
          value={description}
          setValue={e => setDescription(e)}
          placeholder="Description"
        />
      </InputWrapper>
      <ButtonAdd onPress={pickFile}>
        <TextWrapper>Add File</TextWrapper>
      </ButtonAdd>
    </Row>
    <ButtonSave title="Save" onPress={handleSave}/>
    </Wrapper>
  );
}

export default CreateFile;