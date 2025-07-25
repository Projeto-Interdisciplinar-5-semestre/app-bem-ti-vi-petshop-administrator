import React, { useState } from "react";
import { View, Alert, ScrollView, SafeAreaView, Text, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';

import { Title } from "../../../components/Title";
import { NavigationBar } from "../../../components/NavigationBar";
import { Button } from "../../../components/Button";
import ColorPickerModal from "../../../components/ColorPickerModal";
import { Input } from "../../../components/Inputs/Input";
import { InputImage } from "../../../components/Inputs/InputImage";

import { create } from "../../../api/category/create/create";
import { Category } from "../../../utils/Types";

import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';
import { selectImageFromGalery } from "../../../utils/selectImageFromGalery/selectImageFromGalery";

import { styles } from "./style";
import { ButtonLarge } from "../../../components/ButtonLarge";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../routes/AppRoute";
import hardwareBackPress from "../../../utils/hardwareBackPress/hardwareBackPress";
import { ErrorModal } from "../../../components/ErrorModal";

export const CreateCategory = () => {
    const { navigate } = useNavigation<NavigationProps>();
    
    const [nomeCategoria, setNomeCategoria] = useState<string>("");
    const [corCard, setCorCard] = useState<string>("#8b5cf6");
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [imagem, setImagem] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    useValidateToken();
    hardwareBackPress(navigate, "SearchCategory");

    const selecionarImagem = async () => {
        const imageSelected = await selectImageFromGalery();
        if (imageSelected) {
            setImagem(imageSelected);
        }
    };

    const sendRequestCreate = async () => {
        setLoading(true);
        const categoria: Category = {
            id: "",
            name: nomeCategoria,
            pathImage: "",
            cardColor: corCard,
        };

        try {
            const success = await create(categoria, imagem);

            if (typeof success === "boolean") {
                if (success) {
                    setNomeCategoria('');
                    setCorCard('#8b5cf6');
                    setImagem('');
                    setError('');
                    setFields([]);
                    Alert.alert('Sucesso!', 'A categoria foi cadastrada.');
                }
            } else {
                setError(success.message || "Erro desconhecido.");

                setFields(
                    Array.isArray(success.errorFields) 
                    ? success.errorFields.map(field => field.description) 
                    : []
                );
                setErrorModalVisible(true);
            }
        } catch (error) {
            setError('Não foi possível atualizar. Verifique sua conexão.');
            setErrorModalVisible(true);
        }finally {
			setLoading(false);
		}
    };

    return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <Title text="Cadastre uma nova categoria" />

                <Input
                    label="Nome"
                    placeholder="Insira o nome da categoria"
                    keyboardType="default"
                    value={nomeCategoria}
                    onChangeText={setNomeCategoria}
                />

                <InputImage
                    label="Imagem"
                    image={imagem}
                    selectImage={selecionarImagem}
                />

                <View style={{ marginVertical: 20 }}>
                    <Button
                        icon={require('../../../assets/icons/edit.png')}
                        text="  Escolher cor"
                        color={corCard}
                        action={() => setColorModalVisible(true)}
                    />
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#256489" style={{ marginTop: 20 }} />
                ):
                <View style={styles.buttonsContainer}>
                    <ButtonLarge
                        icon={require('../../../assets/icons/add.png')}
                        text="CADASTRAR CATEGORIA"
                        color="#006316"
                        action={sendRequestCreate}
                    />
                </View>}
                <ErrorModal
                    visible={errorModalVisible}
                    error={error}
                    fields={fields}
                    onClose={() => setErrorModalVisible(false)}
                />	
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

        </SafeAreaView>
    </KeyboardAvoidingView>
    );
};