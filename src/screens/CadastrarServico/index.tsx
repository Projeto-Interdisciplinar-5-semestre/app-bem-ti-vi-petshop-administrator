import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import styles from './style';

const CadastrarServico = ({ titulo = "CADASTRAR" }: { titulo?: string }) => {
  const [nomeServico, setNomeServico] = useState<string>('');
  const [descricaoServico, setDescricaoServico] = useState<string>('');
  const [precoServico, setPrecoServico] = useState<string>('');
  const [duracaoEstimada, setDuracaoEstimada] = useState<string>('');
  const [imagem, setImagem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('home');

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

  const handleCadastrarServico = async () => {
    if (!nomeServico || !precoServico || !duracaoEstimada || !descricaoServico || !imagem) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos e selecione uma imagem');
      return;
    }
  
    try {
      const servico = {
        name: nomeServico,
        price: parseFloat(precoServico),
        estimated_duration: duracaoEstimada,
        description: descricaoServico,
      };
  
      const formData = new FormData();
  
      formData.append('service', {
        string: JSON.stringify(servico),
        name: 'service',
        type: 'application/json',
      } as any);
  
      formData.append('file', {
        uri: imagem,
        name: 'imagem.jpg',
        type: 'image/jpeg',
      } as any);
  
      const response = await fetch('http://URL:8080/service/inserir', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        Alert.alert('Sucesso', 'Serviço cadastrado com sucesso!');
        setNomeServico('');
        setPrecoServico('');
        setDuracaoEstimada('');
        setDescricaoServico('');
        setImagem(null);
      } else {
        const errorData = await response.json();
        console.error('Erro no cadastro:', errorData);
        Alert.alert('Erro', errorData.message || 'Erro ao cadastrar serviço');
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
              source={require('../../assets/images/cachorro.png')} 
              style={styles.menuIcon} 
            />
          </View>
        </View>

        {/* Service Info Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Informações do Serviço</Text>
          <View style={styles.divider} />
        </View>

        {/* Form Fields */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome do Serviço</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Digite o nome do serviço"
            placeholderTextColor="#999"
            value={nomeServico}
            onChangeText={setNomeServico}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Preço do Serviço</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Digite o valor do serviço"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={precoServico}
            onChangeText={setPrecoServico}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Duração Estimada</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Ex: 03:30:00"
            placeholderTextColor="#999"
            value={duracaoEstimada}
            onChangeText={setDuracaoEstimada}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Imagem do Serviço</Text>
          <TouchableOpacity 
            style={[
              styles.imagePicker, 
              imagem ? styles.imagePickerActive : null
            ]} 
            onPress={selecionarImagem}
          >
            <Text style={[
              styles.imagePickerText,
              imagem ? styles.imagePickerTextActive : null
            ]}>
              {imagem ? 'Imagem selecionada (clique para alterar)' : 'Selecione uma imagem'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Descrição do Serviço</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Descreva o serviço em detalhes"
            placeholderTextColor="#999"
            multiline
            value={descricaoServico}
            onChangeText={setDescricaoServico}
          />
        </View>

        {/* Submit Button */}
        <View style={styles.submitButtonWrapper}>
          <TouchableOpacity style={styles.submitButton} onPress={handleCadastrarServico}>
            <Text style={styles.submitButtonText}>CADASTRAR SERVIÇO</Text>
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
              source={require('../../assets/images/carrinho.png')} 
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
              source={require('../../assets/images/cachorro.png')} 
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

export default CadastrarServico;