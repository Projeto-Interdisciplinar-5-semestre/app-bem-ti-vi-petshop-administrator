import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Title } from '../../components/Title';
import { NavigationBar } from '../../components/NavigationBar';
import { Button } from '../../components/Button';
import { FormProduct } from '../../components/Forms/FormProduct';

import { styles } from './style';

import { postProduct } from '../../api/product/create/createProduct';
import { listCategory } from '../../api/category/search/listCategory';

type CategoriaType = {
	nome: string;
	value: string;
};


export const CreateProduct = () => {
	const [categoria, setCategoria] = useState<string>('');
	const [nomeProduto, setNomeProduto] = useState<string>('');
	const [valorProduto, setValorProduto] = useState<string>('');
	const [descricaoProduto, setDescricaoProduto] = useState<string>('');
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
		async function carregarCategorias() {
			try {
				const categoriasFormatadas = await listCategory();
				setCategorias(categoriasFormatadas);
			} catch (error) {
				console.error('Erro ao carregar categorias:', error);
			}
		}
		carregarCategorias();
	}, []);


	const handlePost = async () => {
		const produto = {
			name: nomeProduto,
			price: valorProduto,
			description: descricaoProduto,
			categories: [{id: categoria,}],
		};

      	try {
			const success = await postProduct(produto, imagem);
			if (success) {
				setCategoria('')
				setNomeProduto('')
				setValorProduto('')
				setDescricaoProduto('')
				setImagem(null)
				Alert.alert('Sucesso!', 'O produto foi cadastrado.')
			}
    	} catch (error) {
			console.error('POST request failed:', error);
			Alert.alert('Erro', 'Não foi possível cadastrar o produto.');
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

					label4="Imagem do Produto"
					image4={imagem}
					selectImage4={selecionarImagem}


					label5="Descrição do Produto"
					placeholder5="Descreva o produto em detalhes"
					keyboardType5="default"
					value5={descricaoProduto}
					onChangeText5={setDescricaoProduto}
				/>

				<View style={styles.buttonsContainer}>
					<Button icon={require('../../assets/icons/add.png')} text="CADASTRAR PRODUTO" color="#006316"  action={handlePost}  />	
				</View>
			</ScrollView>

			<NavigationBar initialTab='loja'/>
		</SafeAreaView>
	);
};