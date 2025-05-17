import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../routes";
import { styles } from "./style";

export const Home = () => {
    const { navigate } = useNavigation<NavigationProps>();

    return (
        <View style={styles.screen}>
            {/* Product Buttons */}
            <Button text="Cadastrar produto" onPress={() => navigate("CreateProduct")} />
            <Button text="Gerenciar produto" onPress={() => navigate("ManageProduct")} />
            <Button text="Pesquisar produto" onPress={() => navigate("SearchProduct")} />

            {/* Service Buttons */}
            <Button text="Cadastrar serviço" onPress={() => navigate("CreateService")} />
            <Button text="Gerenciar serviço" onPress={() => navigate("ManageService")} />
            <Button text="Pesquisar serviço" onPress={() => navigate("SearchService")} />

            {/* Category Buttons */}
            <Button text="Cadastrar categoria" onPress={() => navigate("CreateCategory")} />
            <Button text="Gerenciar categoria" onPress={() => navigate("ManageCategory")} />
            <Button text="Pesquisar categoria" onPress={() => navigate("SearchCategory")} />

            {/* Admin Buttons */}
            <Button text="Perfil do Administrador" onPress={() => navigate("ShowProfile")} />
            <Button text="Lista de Administradores" onPress={() => navigate("ListAdm")} />


            {/* Login Button */}
            <Button text="Login" onPress={() => navigate("Login")} />
        </View>
    );
};

interface ButtonProps {
    text: string;
    onPress: () => void;
}

function Button({ text, onPress }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}