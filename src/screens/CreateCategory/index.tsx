import React, { useState } from "react";
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

import * as ImagePicker from "expo-image-picker";

import { Title } from "../../components/Title";
import { NavigationBar } from "../../components/NavigationBar";
import { Button } from "../../components/Button";
import { FormCategory } from "../../components/Forms/FormCategory";

import { styles } from "./style";

import { postCategory } from "../../api/category/create/createCategory";
import ColorPickerModal from "../../components/ColorPickerModal";

export const CreateCategory = () => {
    const [nomeCategoria, setNomeCategoria] = useState<string>("");
    const [corCard, setCorCard] = useState<string>("#8b5cf6");
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [imagem, setImagem] = useState<string | null>(null);

    const selecionarImagem = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar suas fotos!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImagem(result.assets[0].uri);
        }
    };

    const handlePost = async () => {
        const categoria = {
            name: nomeCategoria,
            cardColor: corCard,
        };
    
        try {
            const success = await postCategory(categoria, imagem);
            if (success) {
                setNomeCategoria('')
                setCorCard('#8b5cf6')
                setImagem(null)
                Alert.alert('Sucesso!', 'A categoria foi cadastrada.')
            }
        } catch (error) {
            console.error('POST request failed:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar a categoria.');
        }
        };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

                <Title text="Informações da Categoria" />

                <FormCategory
                    label1="Nome da Categoria"
                    placeholder1="Insira o nome da categoria"
                    keyboardType1="default"
                    value1={nomeCategoria}
                    onChangeText1={setNomeCategoria}

                    label2="Imagem da Categoria"
                    image2={imagem}
                    selectImage2={selecionarImagem}
                />
                <View style={{ marginVertical: 20 }}>
                    <Button
                        icon={require('../../assets/icons/edit.png')}
                        text="  Escolher cor"
                        color={corCard}
                        action={() => setColorModalVisible(true)}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <Button icon={require('../../assets/icons/add.png')} text="CADASTRAR SERVIÇO" color="#006316" action={handlePost} />
                </View>
            </ScrollView>
            <ColorPickerModal
                visible={colorModalVisible}
                initialColor={corCard}
                onClose={() => setColorModalVisible(false)}
                onColorSelect={(corSelecionada: string) => {
                    setCorCard(corSelecionada);
                    setColorModalVisible(false);
                }}
            />
            <NavigationBar initialTab="categorias"/>
        </SafeAreaView>
    );
};