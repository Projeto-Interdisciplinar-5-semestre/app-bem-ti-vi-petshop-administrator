import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { NavigationBar } from '../../components/NavigationBar';
import { FormService } from '../../components/Forms/FormService';

import { styles } from './style';
import { searchServiceById } from '../../api/service/search/searchServiceById';
import { deleteService } from '../../api/service/delete/deleteService';
import { updateService } from '../../api/service/update/updateService';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../routes/index';


export default function ManageService() {
    const { navigate } = useNavigation<NavigationProps>();
    const route = useRoute();
    const { id: serviceId } = route.params as { id: string };

    const [nomeServico, setNomeServico] = useState<string>('');
    const [descricaoServico, setDescricaoServico] = useState<string>('');
    const [precoServico, setPrecoServico] = useState<string>('');
    const [duracaoEstimada, setDuracaoEstimada] = useState<string>('');
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
    useEffect(() => {
        const buscarServico = async () => {
            try {
                const data = await searchServiceById( serviceId );
                if (!data) {
                    throw new Error('Erro ao buscar servico');
                }

                setNomeServico(data.name);
                setPrecoServico(String(data.price));
                setDescricaoServico(data.description);
                setDuracaoEstimada(data.estimated_duration);
                setImagem(data.pathImage);
            } catch (erro) {
                console.error('Erro ao buscar servico:', erro);
                Alert.alert('Erro', 'Não foi possível carregar os dados do serviço.');
            }
        };

        buscarServico();
    },[serviceId]);

    const handleUpdate = async () => {
        if (!nomeServico || !precoServico || !duracaoEstimada || !descricaoServico) {
                Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de atualizar.");
                return;
        }
        
        const servico = {
            name: nomeServico,
            price: precoServico,
            estimated_duration: duracaoEstimada,
            description: descricaoServico
        };

        try {
            const success = await updateService(servico, imagem, serviceId);

            if (success){
                Alert.alert('Sucesso!', 'O serviço foi atualizado.');
                navigate('SearchService')
            }
            
        } catch (error) {
            console.error('UPDATE request failed:', error);
            Alert.alert('Erro', 'Falha ao atualizar o serviço.');
        }
    }

    const handleDelete = async () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir este serviço?',
            [
                { text: 'Cancelar', style: 'cancel' }, 
                { 
                    text: 'Excluir',
                    style: 'destructive', 
                    onPress: () => confirmDelete(serviceId),
                },
            ]
        );
    }

    const confirmDelete = async (serviceId: string) => {
    try {
        const success = await deleteService(serviceId);
        
        if (success) {
            Alert.alert('Sucesso!', 'O serviço foi excluído.');
            navigate('SearchService')
        }

    } catch (error) {
        console.error('Erro ao excluir:', error);
        Alert.alert('Erro', 'Não foi possível excluir o serviço.');
    }
};

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

                <Title text="Informações do Serviço" />

                <FormService
                    label1="Nome do Serviço"
                    placeholder1="Digite o nome do serviço"
                    keyboardType1="default"
                    value1={nomeServico}
                    onChangeText1={setNomeServico}

                    label2="Preço do Serviço"
                    placeholder2="Digite o valor do serviço"
                    keyboardType2="numeric"
                    value2={precoServico}
                    onChangeText2={setPrecoServico}

                    label3="Duração Estimada"
                    placeholder3="Ex: 03:30:00"
                    keyboardType3="default"
                    value3={duracaoEstimada}
                    onChangeText3={setDuracaoEstimada}

                    label4="Imagem do Serviço"
                    image4={imagem}
                    selectImage4={selecionarImagem}


                    label5="Descrição do Serviço"
                    placeholder5="Descreva o serviço em detalhes"
                    keyboardType5="default"
                    value5={descricaoServico}
                    onChangeText5={setDescricaoServico}
                />

                <View style={styles.buttonsContainer}>
                    <Button icon={require('../../assets/icons/delete.png')} text="DELETAR" color="#B40000" action={handleDelete} />
                    <Button icon={require('../../assets/icons/edit.png')} text="ATUALIZAR" color="#006516" action={handleUpdate} />
                </View>
            </ScrollView>

            <NavigationBar initialTab='servicos'/>
        </SafeAreaView>
    );
};