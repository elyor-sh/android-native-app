import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { Camera } from "expo-camera";
import { DEV_API_URL } from '@env'
import { httpFilesDelete, httpFilesDownload, httpFilesGet } from '../../components/Api/utils/utils'
import AuthProvider from '../../components/Api/Auth/AuthProvider'
import FileItem from '../../components/FileItem/FileItem';
import CreateFile from '../../components/CreateFile/CreateFile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItem } from '../../hooks/useStorage';

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

    const saveFile = async (fileUri) => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri);
            const DCIM_id = asset.albumId;
            await MediaLibrary.createAlbumAsync('ReactNative', asset);
            await MediaLibrary.removeAssetsFromAlbumAsync([asset], DCIM_id);

        }else{
            console.log('Not permissions')
        }
    }

    const handleDownloadPress = async (item) => {

        try {

            const token = await getItem('token');
            const uri = `${DEV_API_URL}/api/files/download?id=${item._id}`
            const fileUri = `${FileSystem.documentDirectory}/${item.name}.${item.type}`;
            const downloadedFile = await FileSystem.downloadAsync(uri, fileUri, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });

            saveFile(downloadedFile.uri)

        } catch (err) {
            AuthProvider.checkError(err, navigation)
        }

       
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

    if (loading) {
        return <LoadingWrapper>Loading...</LoadingWrapper>
    }

    return (
        <>
            <CreateFile setFiles={e => setFiles([...files, e])} />
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
                                onPress={e => handleDownloadPress(data.item)}
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