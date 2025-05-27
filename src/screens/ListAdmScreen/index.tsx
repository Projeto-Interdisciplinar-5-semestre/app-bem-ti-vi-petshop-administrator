import React from "react";
import { View, ScrollView, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./style";

export const ListAdmScreen = () => {
    const navigation = useNavigation();

    const administrators = [
        {
            id: 1,
            name: "Maria Oliveira",
            photo: require("../../assets/images/admin1.png"),
        },
        {
            id: 2,
            name: "João Silva",
            photo: require("../../assets/images/admin2.png"),
        },
    ];

    const handleDisable = (adminName: string) => {

        Alert.alert(
            "Desabilitar Administrador",
            `Deseja desabilitar o administrador ${adminName}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { 
                    text: "Desabilitar", 
                    onPress: () => {
                        // Lógica para desabilitar o administrador
                        console.log(`Administrador ${adminName} desabilitado`);
                    }
                }
            ]
        );
    };

    const handleDelete = (adminName: string) => {

        Alert.alert(
            "Excluir Administrador",
            `Deseja excluir permanentemente o administrador ${adminName}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { 
                    text: "Excluir", 
                    onPress: () => {
                        // Lógica para excluir o administrador
                        console.log(`Administrador ${adminName} excluído`);
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.safeArea} contentContainerStyle={styles.scrollContent}>
            {/* Header with Back Button */}

            {/* Title Section with Added Spacing */}
            <View style={[styles.greetingContainer, { marginTop: 30 }]}>
                <Text style={styles.greetingText}>Administradores Cadastrados</Text>
                <Text style={styles.subtitle}>Gerencie os administradores do sistema</Text>
            </View>

            {/* Admin List */}
            <View style={styles.listContainer}>
                {administrators.map((admin) => (
                    <View key={admin.id} style={styles.adminCard}>
                        <Image source={admin.photo} style={styles.adminImage} />
                        <Text style={styles.adminName}>{admin.name}</Text>
                        <View style={styles.adminActions}>
                            <TouchableOpacity 
                                style={styles.actionButton}
                                onPress={() => handleDisable(admin.name)}
                            >
                                <Image 
                                    source={require('../../assets/images/desabilitar.png')} 
                                    style={[styles.actionIcon, { width: 40, height: 40, marginLeft: 30 }]} 
                                />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.actionButton]}
                                onPress={() => handleDelete(admin.name)}
                            >
                                <Image 
                                    source={require('../../assets/images/deletar.png')} 
                                    style={[styles.actionIcon, { width: 40, height: 40 }]} 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};