import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import styled from 'styled-components/native'
import AuthProvider from '../../components/Api/Auth/AuthProvider';
import { httpLinksGet } from '../../components/Api/utils/utils';
import { Container } from '../../components/globalComponents/globalComponents'
import LinkItem from '../../components/LinkItem/LinkItem';

const ListWrapper = styled.View`
    padding: 5px 0px;
    margin: 5px 0px;
`;

export default function Links() {

    const [links, setLinks] = useState([])

    const getLinks = async () => {
        await httpLinksGet()
            .then(res => {
                console.log('res', res.data.items)
                setLinks(res.data.items)
            })
            .catch(err => {
                AuthProvider.checkError(err)
            })
    }

    useEffect(() => {
        getLinks()
    }, [])

    return (
        <ScrollView>
            <Container>
                {
                    links.map(item => {
                        return (
                            <ListWrapper key={item._id}>
                                <LinkItem 
                                    link={item.link} 
                                    id={item._id} 
                                    description={item.description}
                                    date={item.date}
                                />
                            </ListWrapper>
                        )
                    })
                }
            </Container>
        </ScrollView>
    )
}