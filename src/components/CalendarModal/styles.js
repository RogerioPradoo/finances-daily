import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
background-color: rgba(34,34,34, 0.4);
`;


export const ModalContent = styled.View`
flex: 2;
justify-content: center;
padding: 15px;
background-color: #FFF;
`;

export const ButtonFilter = styled.TouchableOpacity`
border-radius: 4px;
background-color: #3B3DBF;
height: 45px;
align-items: center;
justify-content: center;
`;

export const ButtonFilterText = styled.Text`
color: #FFF;
font-size: 19px;
font-weight: bold;
`;