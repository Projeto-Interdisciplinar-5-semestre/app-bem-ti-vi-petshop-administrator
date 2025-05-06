import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import styles from './style';

type CategoriaType = {
  label: string;
  value: string;
};

const CadastrarProduto = ({ titulo = "CADASTRAR" }: { titulo?: string }) => {
  const [categoria, setCategoria] = useState<string>('');
  const [nomeProduto, setNomeProduto] = useState<string>('');
  const [valorProduto, setValorProduto] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [imagem, setImagem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  const categorias: CategoriaType[] = [
    { label: '', value: '' },
    { label: 'Alimentos', value: 'Alimentos' },
    { label: 'Beleza', value: 'Beleza' },
    { label: 'Limpeza', value: 'Limpeza' },
    { label: 'Farmácia', value: 'Farmácia' },
    { label: 'Brinquedos', value: 'Brinquedos' },
  ];

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
  const handleCadastrarProduto = async () => {
    if (!nomeProduto || !valorProduto || !categoria || !descricao || !imagem) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos e selecione uma imagem');
      return;
    }
  
    try {
      const produto = {
        name: nomeProduto,
        price: parseFloat(valorProduto),
        categories: [
          { id: "10c65c75-d05b-4b58-8a6a-c29d53f7b1ea" }  // mesmo que só uma, tem que estar em array
        ],
        description: descricao,
      };
  
      const formData = new FormData();
  
      // Envia o JSON como string
      formData.append('product', {
        string: JSON.stringify(produto),
        name: 'product', // importante para compatibilidade
        type: 'application/json',
      } as any);
  
      // Envia a imagem
      formData.append('file', {
        uri: imagem,
        name: 'imagem.jpg',
        type: 'image/jpeg',
      } as any);
  
      const response = await fetch('http://192.168.0.2:8080/produto/inserir', {
        method: 'POST',
        body: formData,
        // Não definir headers aqui! Deixe o fetch cuidar do Content-Type
      });
  
      if (response.ok) {
        Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
        setNomeProduto('');
        setValorProduto('');
        setCategoria('');
        setDescricao('');
        setImagem(null);
      } else {
        const errorData = await response.json();
        console.error('Erro no cadastro:', errorData);
        Alert.alert('Erro', errorData.message || 'Erro ao cadastrar produto');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      Alert.alert('Erro', 'Erro de rede ou erro interno.');
    }
  };
  
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Image 
              source={require('../../assets/images/seta-voltar.png')} 
              style={styles.backIcon} 
            />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{titulo}</Text>
            <Image 
              source={require('../../assets/images/icone-menu.png')} 
              style={styles.menuIcon} 
            />
          </View>
        </View>

        {/* Product Info Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Informações do Produto</Text>
          <View style={styles.divider} />
        </View>

        {/* Form Fields */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome do Produto</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Digite o nome do produto"
            placeholderTextColor="#999"
            value={nomeProduto}
            onChangeText={setNomeProduto}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Valor do Produto</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Digite o valor do produto"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={valorProduto}
            onChangeText={setValorProduto}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Categoria do Produto</Text>
          <View style={styles.pickerWrapper}>
            {!categoria && (
              <Text style={styles.pickerPlaceholder}>
                Selecione uma categoria
              </Text>
            )}
            <Picker
              selectedValue={categoria}
              onValueChange={setCategoria}
              style={styles.picker}
            >
              {categorias.map((item) => (
                <Picker.Item key={item.value} label={item.label} value={item.value} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Imagem do Produto</Text>
          <TouchableOpacity 
            style={[
              styles.imagePicker, 
              imagem ? styles.imagePickerActive : null
            ]} 
            onPress={selecionarImagem}
          >
            {imagem ? (
              <Image 
                source={{ uri: imagem }} 
                style={styles.imagePreview}
              />
            ) : (
              <Text style={[
                styles.imagePickerText,
                imagem ? styles.imagePickerTextActive : null
              ]}>
                {imagem ? 'Imagem selecionada (clique para alterar)' : 'Selecione uma imagem'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Descrição do Produto</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Digite a descrição do produto"
            placeholderTextColor="#999"
            multiline
            value={descricao}
            onChangeText={setDescricao}
          />
        </View>

        {/* Submit Button */}
        <View style={styles.submitButtonWrapper}>
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleCadastrarProduto}
          >
              <Text style={styles.submitButtonText}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('home')}
        >
          <View style={styles.navIconContainer}>
            {activeTab === 'home' && <View style={styles.activeIndicator} />}
            <Image 
              source={require('../../assets/images/home.png')} 
              style={styles.navIcon} 
            />
          </View>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('loja')}
        >
          <View style={styles.navIconContainer}>
            {activeTab === 'loja' && <View style={styles.activeIndicator} />}
            <Image 
              source={require('../../assets/images/cachorro.png')} 
              style={styles.navIcon} 
            />
          </View>
          <Text style={styles.navLabel}>Loja</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('servicos')}
        >
          <View style={styles.navIconContainer}>
            {activeTab === 'servicos' && <View style={styles.activeIndicator} />}
            <Image 
              source={require('../../assets/images/carrinho.png')} 
              style={styles.navIcon} 
            />
          </View>
          <Text style={styles.navLabel}>Serviços</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('perfil')}
        >
          <View style={styles.navIconContainer}>
            {activeTab === 'perfil' && <View style={styles.activeIndicator} />}
            <Image 
              source={require('../../assets/images/perfil.png')} 
              style={styles.navIcon} 
            />
          </View>
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CadastrarProduto;