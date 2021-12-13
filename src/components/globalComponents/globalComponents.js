import styled from "styled-components/native";

export const Container = styled.View`
  padding: 10px;
`;

export const StyledText = styled.Text`
  color: ${props => props.color || '#000'};
`;

export const StyledButton = styled.Button`
    background: ${props => props.background || '#000'};
    color: ${props => props.color || '#000'};
`