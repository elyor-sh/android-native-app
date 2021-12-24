import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
    background: #fff;
    width: 100%;
`

const TextFile = styled.Text`
    padding: 11px 5px;
    width: 60%;
`

function FileItem({name}) {
    return (
        <Wrapper>
           <TextFile>{name}</TextFile> 
        </Wrapper>
    );
}

export default FileItem;