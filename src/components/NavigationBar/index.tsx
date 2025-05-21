import React, { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

import { styles } from "./style"

import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../routes/index';

type NavigationBarProps = {
  initialTab?: string;
};

export const NavigationBar = ({ initialTab = 'home' }: NavigationBarProps) => {
    const { navigate } = useNavigation<NavigationProps>()
    const [activeTab, setActiveTab] = useState(initialTab);

    return (
        <View style={styles.bottomNavigation}>
            <NavItem
                setActiveTab={() => setActiveTab('home')}
                activeTab={activeTab}
                type="home"
                icon={require('../../assets/images/home.png')}
                text="Home"
                onPress={() => navigate('Home')}
            />
            <NavItem
                setActiveTab={() => setActiveTab('loja')}
                activeTab={activeTab}
                type="loja"
                icon={require('../../assets/images/cachorro.png')}
                text="Loja"
                onPress={() => navigate('SearchProduct')}
            />

            <NavItem
                setActiveTab={() => setActiveTab('servicos')}
                activeTab={activeTab}
                type="servicos"
                icon={require('../../assets/images/carrinho.png')}
                text="Serviços"
                onPress={() => navigate('SearchService')}
            />

            <NavItem
                setActiveTab={() => setActiveTab('categorias')}
                activeTab={activeTab}
                type="categorias"
                icon={require('../../assets/images/categorias.png')}
                text="Categorias"
                onPress={() => navigate('SearchCategory')}
            />
            <NavItem
                setActiveTab={() => setActiveTab('perfil')}
                activeTab={activeTab}
                type="perfil"
                icon={require('../../assets/images/perfil.png')}
                text="Perfil"
                onPress={() => navigate('Login')}
            />
        </View>
    )
}


function NavItem(props: any) {
    return (
        <TouchableOpacity style={styles.navItem} onPress={() => {props.setActiveTab(); props.onPress()}}>
            <View style={styles.navIconContainer}>
                {props.activeTab === props.type &&
                    <View style={styles.activeIndicator} />
                }
                <Image source={props.icon} style={styles.navIcon} />
            </View>
            <Text style={styles.navLabel}> {props.text} </Text>
        </TouchableOpacity>
    )
}
