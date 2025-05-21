import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { NavigationProps } from "../../routes"

import { styles } from "./style"

export const Home = () => {
    const { navigate } = useNavigation<NavigationProps>()

    return (
        <View style={styles.screen}>
            <Button text="Cadastrar produto" screen={() => navigate("CreateProduct")} />
            {/* <Button text="Gerenciar produto" screen={() => navigate("ManageProduct")} /> */}
            <Button text="Pesquisar produto" screen={() => navigate("SearchProduct")} />

            <Button text="Cadastrar serviço" screen={() => navigate("CreateService")} />
            {/* <Button text="Gerenciar serviço" screen={() => navigate("ManageService")} /> */}
            <Button text="Pesquisar serviço" screen={() => navigate("SearchService")} />

            <Button text="Cadastrar categoria" screen={() => navigate("CreateCategory")} />
            {/* <Button text="Gerenciar categoria" screen={() => navigate("ManageCategory")} /> */}
            <Button text="Pesquisar categoria" screen={() => navigate("SearchCategory")} />

            <Button text="Login" screen={() => navigate("Login")} />
        </View>
    )
}

function Button(props: any) {
    return (
        <TouchableOpacity style={styles.button} onPress={props.screen}>
            <Text style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    )
}