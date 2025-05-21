import React from "react"
import { View } from "react-native"

import { InputItem } from "../InputItems/InputItem"
import { ButtonItem } from "../InputItems/ButtonItem"
import { InputImageItem } from "../InputItems/InputImageItem"

import { styles } from "../style"
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../routes/index';

export const ListCategory = (props: any) => {
    return (
        <View style={styles.itemContainer}>
            {props.filteredItems.map((item: any) => (
                <ItemService
                    key={item.id}
                    id={item.id}
                    name={item.nome}
                    image={item.imagem}
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
                <InputItem label="Nome da Categoria" value={props.name} />
                <InputImageItem label="Imagem da categoria" imagem={props.image} />
            </View>

            <View style={styles.actions}>
                <ButtonItem source={require('../../../assets/images/olhos.png')} />
                <ButtonItem source={require('../../../assets/images/configuracao.png')} onPress={() => navigate('ManageCategory',{id:props.id})} />
            </View>
        </View>
    )
}