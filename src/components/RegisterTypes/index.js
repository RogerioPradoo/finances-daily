import React, { useState } from "react";
import { RegisterContainer, RegisterTypeButton, RegisterLabel } from "./styles";
import Feather from 'react-native-vector-icons/Feather';

export default function RegisterTypes({ type, sendTypeChanged }) {
    const [typeCheck, setTypeCheck] = useState(type);

    function changeType(name) {
        if (name === 'receita') {
            setTypeCheck('receita');
            sendTypeChanged('receita');
        } else {
            setTypeCheck('despesa');
            sendTypeChanged('despesa');
        }
    }

    return (
        <RegisterContainer>
            <RegisterTypeButton checked={typeCheck === 'receita' ? true : false} onPress={() => changeType('receita')}>
                <Feather name="arrow-up" size={25} color="#121212" />

                <RegisterLabel>
                    Receita
                </RegisterLabel>

            </RegisterTypeButton>

            <RegisterTypeButton checked={typeCheck === 'despesa' ? true : false} onPress={() => changeType('despesa')}>
                <Feather name="arrow-down" size={25} color="#121212" />

                <RegisterLabel>
                    Despesa
                </RegisterLabel>

            </RegisterTypeButton>
        </RegisterContainer>
    )
}