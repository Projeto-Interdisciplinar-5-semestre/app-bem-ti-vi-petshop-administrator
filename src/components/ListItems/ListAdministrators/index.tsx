import React from "react";
import { View, Alert, Image, TouchableOpacity, StyleSheet } from "react-native";
import { InputItem } from "../InputItems/InputItem";
import { InputImageItem } from "../InputItems/InputImageItem";

interface Administrator {
    id: number;
    name: string;
    photo: any;
}

const styles = StyleSheet.create({   
    itemContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        marginTop: 10
    },
    card: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#EEE'
    },
    info: {
        flex: 1
    },
    label: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        color: '#666',
        marginBottom: 2
    },
    value: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 13,
        color: '#333',
        marginBottom: 10
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingHorizontal: 10
    },
    actionButton: {
        width: 32,
        height: 32,
        resizeMode: 'contain'
    }
});

export const ListAdministrators = ({ filteredItems }: { filteredItems: Administrator[] }) => {
    return (
        <View style={styles.itemContainer}>
            {filteredItems.map((admin) => (
                <ItemAdministrator
                    key={admin.id}
                    id={admin.id}
                    name={admin.name}
                    photo={admin.photo}
                />
            ))}
        </View>
    );
};

const ItemAdministrator = ({ id, name, photo }: Administrator) => {
    const handleDelete = () => {
        Alert.alert(
            "Confirmar Exclusão",
            `Deseja deletar o administrador ${name}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { 
                    text: "Deletar", 
                    onPress: () => {
                        // Add your delete logic here
                        console.log(`Administrador ${id} deletado`);
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const handleDisable = () => {
        Alert.alert(
            "Confirmar Desativação",
            `Deseja desabilitar o administrador ${name}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { 
                    text: "Desabilitar", 
                    onPress: () => {
                        // Add your disable logic here
                        console.log(`Administrador ${id} desabilitado`);
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <InputItem label="Nome do Administrador" value={name} />
                <InputImageItem label="Foto de Perfil" image={photo} />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={handleDisable}>
                    <Image 
                        source={require('../../assets/images/desabilitar.png')} 
                        style={styles.actionButton} 
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
                    <Image 
                        source={require('../../assets/images/deletar.png')} 
                        style={styles.actionButton} 
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};