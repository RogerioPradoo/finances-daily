import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import { DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AuthContext, singOut } from '../../contexts/auth';

export default function CustomDrawer(props) {

    const { user, signOut } = useContext(AuthContext);

    return (

        <DrawerContentScrollView {...props} >
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>

                <Image
                    source={require('../../imgs/Logo.png')}
                    style={{ width: 90, height: 90 }}
                    resizeMode="contain"
                />

                <Text style={{ fontSize: 17, marginTop: 15 }}>
                    Bem-Vindo(a)
                </Text>

                <Text style={{
                    fontSize: 17,
                    marginBottom: 14,
                    fontWeight: 'bold',
                    paddingHorizontal: 20
                }}
                    numberOfLines={1}
                >

                    {user && user.name}

                </Text>
            </View>

            <DrawerItemList {...props} />

            <DrawerItem
                {...props}
                label="Sair do app"
                onPress={() => signOut()}
            />

        </DrawerContentScrollView>
    )
}