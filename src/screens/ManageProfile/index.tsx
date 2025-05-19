import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { NavigationBar } from '../../components/NavigationBar';
import { FormProfile } from '../../components/Forms/FormProfile';
import { RootStackParamList } from '../../routes';

import { styles } from './style';

export default function ManageProfile() {
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const adminId = "id"; // Replace with actual admin ID

    const selecionarImagem = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar suas fotos!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setFotoPerfil(result.assets[0].uri);
        }
    };

    useEffect(() => {
        const buscarPerfil = async () => {
            try {
                const resposta = await fetch(`http://URL:8080/administrador/${adminId}/buscar`);
                if (!resposta.ok) {
                    throw new Error('Erro ao buscar perfil');
                }

                const perfil = await resposta.json();
                setNome(perfil.nome || '');
                setEmail(perfil.email || '');
                setFotoPerfil(perfil.fotoPerfil || null);
            } catch (erro) {
                console.error('Erro ao buscar perfil:', erro);
                Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
            }
        };

        buscarPerfil();
    }, [adminId]);

    const atualizarPerfil = async () => {
        if (!nome || !email) {
            Alert.alert("Campos obrigatórios", "Preencha pelo menos nome e e-mail antes de atualizar.");
            return;
        }

        const perfil = {
            nome,
            email,
            senha: senha || undefined
        };

        const formData = new FormData();
        formData.append('administrador', JSON.stringify(perfil));

        if (fotoPerfil) {
            formData.append('file', {
                uri: fotoPerfil,
                name: 'fotoPerfil.jpg',
                type: 'image/jpeg',
            } as any);
        }

        try {
            const response = await fetch(`http://URL:8080/administrador/${adminId}/atualizar`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
            } else {
                const error = await response.json();
                Alert.alert("Erro", error.message || "Erro ao atualizar o perfil.");
            }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    };

    const deletarPerfil = async () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja deletar este perfil? Esta ação é irreversível!',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Deletar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const response = await fetch(`http://URL:8080/administrador/${adminId}/deletar`, {
                                method: 'DELETE',
                            });

                            if (response.ok) {
                                Alert.alert('Sucesso', 'Perfil deletado com sucesso!');
                                navigation.navigate('Login');
                            } else {
                                const erro = await response.json();
                                Alert.alert('Erro', erro.message || 'Erro ao deletar o perfil.');
                            }
                        } catch (error) {
                            console.error('Erro ao deletar perfil:', error);
                            Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
                        }
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                style={styles.scrollView} 
                contentContainerStyle={styles.scrollContent} 
                keyboardShouldPersistTaps="handled"
            >
                <Title text="Gerenciar Perfil" />

                <FormProfile
                    label1="Nome do Administrador"
                    placeholder1="Insira o nome completo"
                    value1={nome}
                    onChangeText1={setNome}
                    label2="E-mail do Administrador"
                    placeholder2="Insira o e-mail"
                    keyboardType2="email-address"
                    value2={email}
                    onChangeText2={setEmail}
                    label3="Senha do Administrador"
                    placeholder3="Insira a nova senha"
                    secureTextEntry3={true}
                    value3={senha}
                    onChangeText3={setSenha}
                    label4="Foto de Perfil"
                    image4={fotoPerfil}
                    selectImage4={selecionarImagem}
                />

                <View style={styles.buttonsContainer}>
                    <Button 
                        icon={require('../../assets/icons/deletar.png')} 
                        text="DELETAR" 
                        color="#B40000" 
                        action={deletarPerfil} 
                    />
                    <Button 
                        icon={require('../../assets/icons/edit.png')} 
                        text="ATUALIZAR" 
                        color="#006516" 
                        action={atualizarPerfil} 
                    />
                </View>
            </ScrollView>

            <NavigationBar />
        </SafeAreaView>
    );
}