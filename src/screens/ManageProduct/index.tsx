import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { NavigationBar } from '../../components/NavigationBar';
import { FormProduct } from '../../components/Forms/FormProduct';
import { searchProductById } from '../../api/product/search/searchProductById';
import { deleteProduct } from '../../api/product/delete/deleteProduct';
import { updateProduct } from '../../api/product/update/updateProduct';
import { listCategory } from '../../api/category/search/listCategory';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../routes/index';

import { styles } from './style';

type CategoriaType = {
    nome: string;
    value: string;
};

export default function ManageProduct() {
    const { navigate } = useNavigation<NavigationProps>();
    const route = useRoute();
    const { id: productId } = route.params as { id: string };

    const [categoria, setCategoria] = useState<string>('');
    const [nomeProduto, setNomeProduto] = useState<string>('');
    const [valorProduto, setValorProduto] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [imagem, setImagem] = useState<string | null>(null);
    const [categorias, setCategorias] = useState<CategoriaType[]>([]);


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
        const buscarProduto = async () => {
            try {
                const data = await searchProductById(productId);
                if (!data) {
                    throw new Error('Erro ao buscar produto');
                }

                const categoriasFormatadas = await listCategory();
                setCategorias(categoriasFormatadas);
                setNomeProduto(data.name);
                setValorProduto(String(data.price));
                setDescricao(data.description);
                setCategoria(data.categories?.[0]?.id);
                setImagem(data.pathImage);
            } catch (erro) {
                console.error('Erro ao buscar produto:', erro);
                Alert.alert('Erro', 'Não foi possível carregar os dados do produto.');
            }
        };

        buscarProduto();
    }, [productId]);

    const handleUpdate = async () => {
        if (!nomeProduto || !valorProduto || !descricao || !categoria) {
            Alert.alert("Campos obrigatórios", "Preencha todos os campos antes de atualizar.");
            return;
        }

        const produto = {
            name: nomeProduto,
            price: parseFloat(valorProduto),
            categories: [
                { id: categoria }
            ],
            description: descricao,
        };

        try {
            const success = await updateProduct( produto, imagem, productId )

            if (success) {
                Alert.alert("Sucesso!", "O produto foi atualizado.");
                navigate('SearchProduct')
            }

        } catch (error) {
            console.error('UPDATE request failed:', error);
            Alert.alert('Erro!', 'Falha ao atualizar o produto.');
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir este produto?',
            [
                { text: 'Cancelar', style: 'cancel' }, 
                { 
                    text: 'Excluir',
                    style: 'destructive', 
                    onPress: () => confirmDelete(productId),
                },
            ]
        );
    };

    const confirmDelete = async (productId: string) => {
        try {
            const success = await deleteProduct(productId);
            
            if (success) {
                Alert.alert('Sucesso!', 'O produto foi excluído.');
                navigate('SearchProduct')
            }

        } catch (error) {
            console.error('Erro ao excluir:', error);
            Alert.alert('Erro', 'Não foi possível excluir o produto.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

                <Title text="Informações do Produto" />

                <FormProduct
                    label1="Nome do Produto"
                    placeholder1="Digite o nome do produto"
                    keyboardType1="default"
                    value1={nomeProduto}
                    onChangeText1={setNomeProduto}

                    label2="Valor do Produto"
                    placeholder2="Digite o valor do produto"
                    keyboardType2="numeric"
                    value2={valorProduto}
                    onChangeText2={setValorProduto}

                    label3="Categoria do Produto"
                    category3={categoria}
                    setCategory3={setCategoria}
                    categories3={categorias}

                    label4="Imagem do Serviço"
                    image4={imagem}
                    selectImage4={selecionarImagem}


                    label5="Descrição do Serviço"
                    placeholder5="Descreva o serviço em detalhes"
                    keyboardType5="default"
                    value5={descricao}
                    onChangeText5={setDescricao}
                />

                <View style={styles.buttonsContainer}>
                    <Button icon={require('../../assets/icons/delete.png')} text="DELETAR" color="#B40000" action={handleDelete} />
                    <Button icon={require('../../assets/icons/edit.png')} text="ATUALIZAR" color="#006516" action={handleUpdate} />
                </View>
            </ScrollView>

            <NavigationBar initialTab='loja'/>
        </SafeAreaView>
    );
};