import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { styles } from './style';
import { NavigationBar } from '../../components/NavigationBar';

export const ShowProfile = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image 
                        source={require('../../assets/images/girl.png')} 
                        style={styles.profileImage} 
                    />
                    <Text style={styles.profileLabel}>Administrador</Text>
                </View>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    {/* Menu Items */}
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                            <Image source={require('../../assets/images/ver.png')} style={styles.menuItemIcon} />
                            <Text style={styles.menuItemText}>Ver Meus Dados</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                            <Image source={require('../../assets/images/editar.png')} style={styles.menuItemIcon} />
                            <Text style={styles.menuItemText}>Editar Perfil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                            <Image source={require('../../assets/images/password.png')} style={styles.menuItemIcon} />
                            <Text style={styles.menuItemText}>Alterar senha</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                            <Image source={require('../../assets/images/adm.png')} style={styles.menuItemIcon} />
                            <Text style={styles.menuItemText}>Cadastrar Adm's</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                            <Image source={require('../../assets/images/historico.png')} style={styles.menuItemIcon} />
                            <Text style={styles.menuItemText}>Histórico de Adm's</Text>
                        </TouchableOpacity>

                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity style={styles.logoutButton}>
                        <Image source={require('../../assets/images/logout.png')} style={styles.logoutIcon} />
                        <Text style={styles.logoutText}>Deslogar Perfil</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <NavigationBar />    
        </SafeAreaView>
    );
};