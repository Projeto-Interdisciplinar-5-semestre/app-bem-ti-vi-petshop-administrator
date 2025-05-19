import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { styles } from './style';

interface FormProfileProps {
    // Name fields
    label1: string;
    placeholder1: string;
    value1: string;
    onChangeText1: (text: string) => void;
    
    // Email fields
    label2: string;
    placeholder2: string;
    keyboardType2?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    value2: string;
    onChangeText2: (text: string) => void;
    
    // Password fields
    label3: string;
    placeholder3: string;
    secureTextEntry3?: boolean;
    value3: string;
    onChangeText3: (text: string) => void;
    
    // Profile photo fields
    label4: string;
    image4: string | null;
    selectImage4: () => void;
}

export const FormProfile: React.FC<FormProfileProps> = ({
    label1, placeholder1, value1, onChangeText1,
    label2, placeholder2, keyboardType2 = 'default', value2, onChangeText2,
    label3, placeholder3, secureTextEntry3 = false, value3, onChangeText3,
    label4, image4, selectImage4
}) => {
    return (
        <View style={styles.formContainer}>
            {/* Name Field */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>{label1}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder1}
                    value={value1}
                    onChangeText={onChangeText1}
                />
            </View>

            {/* Email Field */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>{label2}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder2}
                    keyboardType={keyboardType2}
                    value={value2}
                    onChangeText={onChangeText2}
                />
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>{label3}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder3}
                    secureTextEntry={secureTextEntry3}
                    value={value3}
                    onChangeText={onChangeText3}
                />
            </View>

            {/* Profile Photo */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>{label4}</Text>
                <TouchableOpacity 
                    style={styles.imagePicker} 
                    onPress={selectImage4}
                >
                    {image4 ? (
                        <Image 
                            source={{ uri: image4 }} 
                            style={styles.imagePreview} 
                        />
                    ) : (
                        <Text style={styles.imagePickerText}>Selecionar Imagem</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};