import React, { useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView, Text, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';

import { Title } from '../../../components/Title';
import { Button } from '../../../components/Button';
import { NavigationBar } from '../../../components/NavigationBar';
import { Input } from '../../../components/Inputs/Input';
import { InputImage } from '../../../components/Inputs/InputImage';
import { InputPassword } from '../../../components/Inputs/InputPassword';

import { create } from '../../../api/administrator/create/create';
import {Administrator} from '../../../utils/Types'

import { selectImageFromGalery } from '../../../utils/selectImageFromGalery/selectImageFromGalery';
import { useValidateToken } from '../../../utils/UseValidateToken/useValidateToken';

import { styles } from './style';
import { ButtonLarge } from '../../../components/ButtonLarge';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../routes/AppRoute';
import hardwareBackPress from '../../../utils/hardwareBackPress/hardwareBackPress';
import { ErrorModal } from '../../../components/ErrorModal';

export default function CreateAdministrator() {
    const { navigate } = useNavigation<NavigationProps>();

    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [password, setPassword] = useState<string>('');
    const [passwordRepet, setPasswordRepet] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepet, setShowPasswordRepet] = useState(false);

    const [fotoPerfil, setFotoPerfil] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [fields, setFields] = useState<string[]>([]);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    hardwareBackPress(navigate, "SearchAdministrator");

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowPasswordRepet = () => setShowPasswordRepet(!showPasswordRepet);

    useValidateToken();

    const selecionarImagem = async () => {
        const imageSelected = await selectImageFromGalery();
        if (imageSelected) {
            setFotoPerfil(imageSelected);
        }
    };

    const sendRequestCreate = async () => {
        setLoading(true);
        if (password != passwordRepet) {
            Alert.alert("Atenção!", "As não digitadas não são iguais!");
            return;
        }

        const administrator: Administrator = {
            id: '',
            name: nome,
            email: email,
            isEmailActive: false,
            password: password,
            pathImage: '',
            activationStatus: null
        };

        try {
            const success = await create(administrator, fotoPerfil);
            if (typeof success === "boolean") {
                if (success) {
                    setNome('');
                    setEmail('');
                    setPassword('');
                    setPasswordRepet('');
                    setFotoPerfil('');
                    setError('');
                    setFields([]);
                    Alert.alert('Sucesso!', 'O administrador foi cadastrada.');
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
                <Title text="Criar conta de administrador" />

                <View style={styles.formContainer}>

                    <Input
                        label="Nome"
                        placeholder="Insira o nome completo"
                        keyboardType="default"
                        value={nome}
                        onChangeText={setNome}
                    />

                    <Input
                        label="E-mail"
                        placeholder="Insira o e-mail"
                        keyboardType="default"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <InputPassword
                        label="Senha"
                        placeholder="Digite sua senha"
                        toggleShowPassword={toggleShowPassword}
                        showPassword={showPassword}
                        password={password}
                        setPassword={setPassword}
                    />

                    <InputPassword
                        label="Repita a senha"
                        placeholder="Digite a sua senha novamente"
                        toggleShowPassword={toggleShowPasswordRepet}
                        showPassword={showPasswordRepet}
                        password={passwordRepet}
                        setPassword={setPasswordRepet}
                    />

                    <InputImage
                        label="Imagem do Perfil"
                        image={fotoPerfil}
                        selectImage={selecionarImagem}
                    />
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#256489" style={{ marginTop: 20 }} />
                ):
                <View style={styles.buttonsContainer}>
                    <ButtonLarge
                        icon={require('../../../assets/icons/add.png')}
                        text="CADASTRAR"
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
}