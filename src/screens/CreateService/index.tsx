import React, { useState } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Title } from '../../components/Title';
import { NavigationBar } from '../../components/NavigationBar';
import { Button } from '../../components/Button';
import { FormService } from '../../components/Forms/FormService';

import { styles } from './style';

import { postService } from '../../api/service/create/createService';

export const CreateService = () => {
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
    
    const handlePost = async () => {
        const servico = {
            name: nomeServico,
            price: precoServico,
            estimated_duration: duracaoEstimada,
            description: descricaoServico,
        };

        try {
            const success = await postService(servico, imagem);
            if (success){
                setNomeServico('')
                setPrecoServico('')
                setDuracaoEstimada('')
                setDescricaoServico('')
                setImagem(null)
                Alert.alert('Sucesso!', 'O serviço foi cadastrado.')
            }
        } catch (error) {
            console.error('POST request failed:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar o serviço.');
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
                    <Button icon={require('../../assets/icons/add.png')} text="CADASTRAR SERVIÇO" color="#006316" action={handlePost} />
                </View>
            </ScrollView>

            <NavigationBar initialTab='servicos'/>
        </SafeAreaView>
    );
};
