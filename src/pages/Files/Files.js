import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { httpFilesDelete, httpFilesGet } from '../../components/Api/utils/utils'
import AuthProvider from '../../components/Api/Auth/AuthProvider'
import FileItem from '../../components/FileItem/FileItem';
import CreateFile from '../../components/CreateFile/CreateFile';

const ListWrapper = styled.View`
    padding: 5px 0px;
    flex-direction: row;
    justify-content: flex-end;
`;

const IconWrapper = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: ${props => props.padding || '0px'};
    backgroundColor: ${props => props.background || '#4d4fff'};
`

const LoadingWrapper = styled.Text`
    padding: 10px;
`;

export default function Files({ route, navigation }) {

    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)

    const getFiles = async () => {
        await httpFilesGet()
            .then(res => {
                console.log('res files::', res.data)
                setFiles(res.data.items)
            })
            .catch(err => {
                AuthProvider.checkError(err, navigation)
            })
    }

    const handleEditPress = (id) => {
        console.log('ed', id)
    }

    const handleDownloadPress = (id) => {
        console.log('do', id)
    }

    const handleDeletePress = async (id) => {
        await httpFilesDelete(id)
            .then(() => {
                setFiles(prev => prev.filter(item => item._id !== id))
            })
            .catch(err => {
                AuthProvider.checkError(err, navigation)
            })
    }

    useEffect(() => {
        getFiles()
    }, [])

    if(loading){
        return <LoadingWrapper>Loading...</LoadingWrapper>
    }

    return (
        <>
            <CreateFile setFiles={e => setFiles([...files, e])}/>
            {files && files.length > 0 ?
                <SwipeListView
                    data={files}
                    style={{ padding: 10 }}
                    keyExtractor={item => item._id}
                    renderItem={(data, rowMap) => (
                        <ListWrapper key={data.item._id}>
                            <FileItem name={data.item.name} />
                        </ListWrapper>
                    )}
                    renderHiddenItem={(data, rowMap) => (
                        <ListWrapper key={data.item._id + Math.random() * 100}>
                            <IconWrapper
                                onPress={e => handleDownloadPress(data.item._id)}
                                padding={'0px 0px 0px'}
                                background={'#01b610'}
                            >
                                <MaterialCommunityIcons name="cloud-download" color={'#fff'} size={20} />
                            </IconWrapper>
                            <IconWrapper
                                onPress={e => handleEditPress(data.item._id)}
                                padding={'5px 0px 0px'}
                            >
                                <MaterialCommunityIcons name="border-color" color={'#fff'} size={20} />
                            </IconWrapper>
                            <IconWrapper
                                background={'#f81d1d'}
                                padding={'0px 0px 0px'}
                                onPress={e => handleDeletePress(data.item._id)}
                            >
                                <MaterialCommunityIcons name="delete" color={'#fff'} size={20} />
                            </IconWrapper>
                        </ListWrapper>
                    )}
                    leftOpenValue={0}
                    rightOpenValue={-120}
                />
                :
                <LoadingWrapper>No files...</LoadingWrapper>
            }
        </>
    )
}