import React, { useContext, useState } from 'react';
import { Platform, ActivityIndicator } from 'react-native';

import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from '../SignIn/styles';

import { AuthContext } from '../../contexts/auth';

export default function SignUp() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { singUp, loadingAuth } = useContext(AuthContext);

    function handleSingUp() {
        if (nome === '' || email === '' || password === '') return;

        singUp(email, password, nome);
    }

    return (
        <Background>
            <Container
                behavior={Platform.OS === "ios" ? 'padding' : ''}
                enabled
            >
                <Logo
                    source={require('../../imgs/Logo.png')}
                />

                <AreaInput>
                    <Input
                        placeholder="Seu Nome"
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                    />
                </AreaInput>


                <AreaInput>
                    <Input
                        placeholder="Seu Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Sua Senha"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </AreaInput>

                <SubmitButton activeOpacity={0.7} onPress={handleSingUp}>

                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color="#FFF" />
                        ) : (
                            <SubmitText>Cadastrar</SubmitText>
                        )
                    }

                </SubmitButton>

            </Container>
        </Background>
    );
}