import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GLOBAL_VAR } from '../../api/config/globalVar';
import { login, UserAuth } from '../../api/auth/login/login';

import { NavigationProps } from '../../routes/AppRoute';

import { styles } from './style';

export const Login = () => {
    const { replace } = useNavigation<NavigationProps>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const sendRequestLogin = async () => {
        const userAuth: UserAuth = {
            email: email,
            password: password,
        };

        try {
            const response = await login(userAuth);

            if ('token' in response) {
                setEmail('');
                setPassword('');
                setError('');
                GLOBAL_VAR.TOKEN_JWT = response.token;
                replace('Home');
            } else {
                setError(response.message);
            }

        } catch (error) {
            setError('Erro ao tentar acessar o painel. Verifique suas credenciais ou conexão.');
        }
    };

    const [counter, setCounter] = useState<number>(0);
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            setCounter(prevCounter => {
                const newCounter = prevCounter + 1;

                if (newCounter >= 2) {
                    BackHandler.exitApp();
                } else {
                    ToastAndroid.show('Pressione novamente para sair', ToastAndroid.SHORT);

                }

                return newCounter;
            });

            return true;
        });

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.logoSubText}>PAINEL ADMINISTRATIVO</Text>
            </View>

            <View style={styles.inputContainer}>
                <Image
                    source={require('../../assets/images/email.png')}
                    style={styles.inputIcon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="E-mail institucional"
                    placeholderTextColor="#1B3B6F"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={toggleShowPassword}>
                    <Image
                        source={showPassword
                            ? require('../../assets/images/olhando.png')
                            : require('../../assets/images/senha.png')}
                        style={styles.inputIcon}
                    />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Senha administrativa"
                    placeholderTextColor="#1B3B6F"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={sendRequestLogin}>
                <Text style={styles.loginButtonText}>Entrar no Painel</Text>
            </TouchableOpacity>

            <Text style={styles.error}>{error}</Text>
        </View>
    );
};
