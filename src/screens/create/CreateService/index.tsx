import React, { useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';

import { Title } from '../../../components/Title';
import { NavigationBar } from '../../../components/NavigationBar';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Inputs/Input';
import { InputImage } from '../../../components/Inputs/InputImage';
import { InputDescription } from '../../../components/Inputs/InputDescription';
import { InputTime } from '../../../components/Inputs/InputTime';

import { create } from '../../../api/service/create/create';
import { Service } from '../../../utils/Types';

import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';
import { selectImageFromGalery } from '../../../utils/selectImageFromGalery/selectImageFromGalery';

import { styles } from './style';
import { InputSmall } from '../../../components/Inputs/InputSmall';
import { ButtonLarge } from '../../../components/ButtonLarge';
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../routes/AppRoute';
import { ErrorModal } from '../../../components/ErrorModal';

export const CreateService = () => {
    const { navigate } = useNavigation<NavigationProps>();

    const [nomeServico, setNomeServico] = useState<string>('');
    const [descricaoServico, setDescricaoServico] = useState<string>('');
    const [precoServico, setPrecoServico] = useState<string>('');
    const [duracaoEstimada, setDuracaoEstimada] = useState<string>('');
    const [imagem, setImagem] = useState<string>('');

    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    useValidateToken();
    hardwareBackPress(navigate, "SearchService");

    const selecionarImagem = async () => {
        const imageSelected = await selectImageFromGalery();
        if (imageSelected) {
            setImagem(imageSelected);
        }
    };

    const handleTimeChange = (event: any, selectedDate?: Date) => {
        setShowTimePicker(false);
        if (event.type === "dismissed") return;

        if (selectedDate) {
            const hours = selectedDate.getHours().toString().padStart(2, '0');
            const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
            const seconds = selectedDate.getSeconds().toString().padStart(2, '0');
            setDuracaoEstimada(`${hours}:${minutes}:${seconds}`);
        }
    };

    const sendRequestCreate = async () => {
        setLoading(true);
        const servico: Service = {
            id: null,
            name: nomeServico,
            price: parseFloat(precoServico),
            pathImage: imagem,
            estimatedDuration: duracaoEstimada,
            description: descricaoServico,
            activationStatus: null,
        };

        try {
            const success = await create(servico, imagem);
            if (typeof success === "boolean") {
                if (success) {
                    setNomeServico('');
                    setPrecoServico('');
                    setDuracaoEstimada('');
                    setDescricaoServico('');
                    setImagem('');
                    setError('');
                    setFields([]);
                    Alert.alert('Sucesso!', 'O serviço foi cadastrado.');
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

                <Title text="Cadastre um novo serviço" />

                <Input
                    label="Nome"
                    placeholder="Digite o nome aqui"
                    keyboardType="default"
                    value={nomeServico}
                    onChangeText={setNomeServico}
                />

                <View style={styles.subcontainer}>
                    <InputTime
                        label="Duração estimada"
                        durationEstimated={duracaoEstimada}
                        setShowTimePicker={setShowTimePicker}
                        showTimePicker={showTimePicker}
                        handleTimeChange={handleTimeChange}
                    />

                    <InputSmall
                        label="Valor"
                        placeholder="Digite o valor aqui"
                        keyboardType="numeric"
                        value={precoServico}
                        onChangeText={setPrecoServico}
                    />
                </View>

                <InputImage
                    label="Imagem"
                    image={imagem}
                    selectImage={selecionarImagem}
                />

                <InputDescription
                    label="Descrição"
                    placeholder="Descreva o serviço em detalhes"
                    keyboardType="default"
                    value={descricaoServico}
                    onChangeText={setDescricaoServico}
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#256489" style={{ marginTop: 20 }} />
                ):
                <View style={styles.buttonsContainer}>
                    <ButtonLarge
                        icon={require('../../../assets/icons/add.png')}
                        text="CADASTRAR SERVIÇO"
                        color="#006316"
                        action={sendRequestCreate}
                    />
                </View>
                }

                <ErrorModal
                    visible={errorModalVisible}
                    error={error}
                    fields={fields}
                    onClose={() => setErrorModalVisible(false)}
                />	
            </ScrollView>

        </SafeAreaView>
    </KeyboardAvoidingView>
    );
};
