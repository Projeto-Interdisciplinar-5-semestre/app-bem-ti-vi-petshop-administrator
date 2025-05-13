import React from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
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

    return (
        <ScrollView style={styles.safeArea} contentContainerStyle={styles.scrollContent}>

            {/* Title */}
            <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>Administradores Cadastrados</Text>
            </View>

            {/* Admin List */}
            <View style={styles.listContainer}>
                {administrators.map((admin) => (
                    <View key={admin.id} style={styles.adminCard}>
                        <Image source={admin.photo} style={styles.adminImage} />
                        <Text style={styles.adminName}>{admin.name}</Text>
                        <View style={styles.adminActions}>
                            <TouchableOpacity>
                                <Image 
                                    source={require('../../assets/images/desabilitar.png')} 
                                    style={styles.actionIcon} 
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image 
                                    source={require('../../assets/images/deletar.png')} 
                                    style={styles.actionIcon} 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};