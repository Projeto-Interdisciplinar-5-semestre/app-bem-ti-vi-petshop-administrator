import React, { Dispatch, SetStateAction } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "./style";

type InputPasswordProps = {
    label: string;
    placeholder: string;
    toggleShowPassword: () => void;
    showPassword: boolean;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
};

export const InputPassword = ({ label, placeholder, toggleShowPassword, showPassword, password, setPassword }: InputPasswordProps) => {
    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputField}>
                <TextInput
                    style={styles.inputText}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={toggleShowPassword}>
                    <Image
                        source={
                            showPassword
                                ? require('../../../assets/images/olhando.png')
                                : require('../../../assets/images/senha.png')
                        }
                        style={styles.inputIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
