import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import AuthProvider from '../../components/Api/Auth/AuthProvider';
import { httpLinkDelete, httpLinksGet } from '../../components/Api/utils/utils';
import LinkItem from '../../components/LinkItem/LinkItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CreateLink from '../../components/CreateLink/CreateLink';

const ListWrapper = styled.View`
    padding: 5px 0px;
    flex-direction: row;
    justify-content: flex-end;
`;

const IconWrapper = styled.TouchableOpacity`
    width: 40px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    paddingTop: ${props => props.padding || '7px'};
    backgroundColor: ${props => props.background || '#4d4fff'};
    height: 38px;
`

const LoadingWrapper = styled.Text`
    padding: 10px;
`;

export default function Links({route, navigation}) {

    const [links, setLinks] = useState([])
    const [loading, setLoading] = useState(false)
    const [getItem, setGetItem] = useState(false)

    const getLinks = async () => {
        await httpLinksGet()
            .then(res => {
                console.log('res', res.data.items)
                setLinks(res.data.items)
            })
            .catch(err => {
                AuthProvider.checkError(err, navigation)
            })
    }

    const handleEditPress = (id) => {
        navigation.navigate('Edit link', {
            id: id
        })
    }

    const handleDeletePress = async (id) => {

        setLoading(true)

        await httpLinkDelete(id)
            .then(res => {
                setLinks(prev => {
                    return prev.filter(item => item.id !== id)
                })
                setGetItem(true)
            })
            .catch(err => {
                setLoading(false)
                AuthProvider.checkError(err)
            })
    }


    useEffect(() => {
        getLinks()
    }, [])

    useEffect(() => {
        if((route.params && route.params.updateLinks)){
            getLinks()
        }
    }, [route.params])

    useEffect(() => {
        if(getItem){
            getLinks()
            setGetItem(false)
            setLoading(false)
        }
    }, [getItem])

    if(loading){
        return <LoadingWrapper>Loading...</LoadingWrapper>
    }

    return (
        <>
            <CreateLink 
                setLoading={e => setLoading(e)} 
                setGetItem={e => setGetItem(e)}
            />
            {
                links && links.length > 0 &&
                <SwipeListView
                    data={links}
                    style={{ padding: 10 }}
                    keyExtractor={item => item._id}
                    renderItem={(data, rowMap) => (
                        <ListWrapper key={data.item._id}>
                            <LinkItem
                                link={data.item.link}
                                id={data.item._id}
                                description={data.item.description}
                                date={data.item.date}
                            />
                        </ListWrapper>
                    )}
                    renderHiddenItem={(data, rowMap) => (
                        <ListWrapper key={data.item._id + Math.random() * 100}>
                            <IconWrapper
                                onPress={e => handleEditPress(data.item._id)}
                            >
                                <MaterialCommunityIcons name="border-color" color={'#fff'} size={20} />
                            </IconWrapper>
                            <IconWrapper
                                background={'#f81d1d'}
                                padding={'3px'}
                                onPress={e => handleDeletePress(data.item._id)}
                            >
                                <MaterialCommunityIcons name="delete" color={'#fff'} size={20} />
                            </IconWrapper>
                        </ListWrapper>
                    )}
                    leftOpenValue={0}
                    rightOpenValue={-80}
                />
            }
        </>
    )
}