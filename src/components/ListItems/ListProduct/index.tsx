import React from "react"
import { View } from "react-native"

import { InputItem } from "../InputItems/InputItem"
import { ButtonItem } from "../InputItems/ButtonItem"

import { styles } from "../style"
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../routes/index';

export const ListProduct = (props: any) => {
    return (
        <View style={styles.itemContainer}>
            {props.filteredItems.map((item: any) => (
                <ItemService
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    price={item.price}
                />
            ))}
        </View>
    )
}

export const ItemService = (props: any) => {
    const { navigate } = useNavigation<NavigationProps>();

    return (
        <View key={props.id} style={styles.card}>
            <View style={styles.info}>
                <InputItem label="Nome" value={props.name} />
                <InputItem label="Categoria" value={props.category} />
                <InputItem label="Valor" value={props.price} />
            </View>

            <View style={styles.actions}>
                <ButtonItem source={require('../../../assets/images/olhos.png')} />
                <ButtonItem source={require('../../../assets/images/configuracao.png')} onPress={() => navigate('ManageProduct', {id:props.id})} />
            </View>
        </View>
    )
}