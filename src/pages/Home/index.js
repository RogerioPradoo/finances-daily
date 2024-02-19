import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../contexts/auth';
import { Background, ListBalance, Area, Title, List } from './styles';
import Header from '../../components/Header';
import api from "../../services/api";
import { format } from 'date-fns';
import { useIsFocused } from "@react-navigation/native";
import BalanceItem from "../../components/BalanceItem";
import { Modal, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import HistoricoList from "../../components/HistoricoList";
import CalendarModal from "../../components/CalendarModal";

export default function Home() {
    const isFocused = useIsFocused();
    const { signOut, user } = useContext(AuthContext);
    const [listBalance, setListBalance] = useState([]);
    const [dateMovements, setDateMovements] = useState(new Date());
    const [movements, setMovements] = useState([]);
    const [visible, setVisible] = useState(false);

    async function handleDelete(id) {
        try {

            await api.delete('/receives/delete', {
                params: {
                    item_id: id
                }
            })

            setDateMovements(new Date())

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let isActive = true;

        async function getMovements() {
            let date = new Date(dateMovements);
            let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
            let dateFormated = format(onlyDate, 'dd/MM/yyyy');

            const receives = await api.get('/receives', {
                params: {
                    date: dateFormated
                }
            })

            const balance = await api.get('/balance', {
                params: {
                    date: dateFormated
                }
            })

            if (isActive) {
                setListBalance(balance.data);
                setMovements(receives.data);
            }

        }

        getMovements();

        return () => isActive = false;

    }, [isFocused, dateMovements]);

    function filterDateMovements(dateSelected) {
        setDateMovements(dateSelected);
    }

    return (
        <Background>
            <Header title="Minhas movimentações" />
            <ListBalance
                data={listBalance}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.tag}
                renderItem={({ item }) => <BalanceItem data={item} />}
            />

            <Area>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Icon name="event" color="#121212" size={30} />
                </TouchableOpacity>
                <Title>Ultimas movimentações</Title>
            </Area>

            <List
                data={movements}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <HistoricoList data={item} deleteItem={handleDelete} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            <Modal
                visible={visible}
                animationType='fade'
                transparent={true}
            >
                <CalendarModal
                    setVisible={() => setVisible(false)}
                    handleFilter={filterDateMovements}
                />
            </Modal>

        </Background>
    )
}