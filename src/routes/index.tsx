import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Home } from '../screens/Home';
import { Header } from '../components/Header';
import { ShowProfile } from '../screens/ShowProfile';

import { CreateProduct } from '../screens/CreateProduct';
import ManageProduct from '../screens/ManageProduct';
import { SearchProduct } from '../screens/SearchProduct';

import { CreateService } from '../screens/CreateService';
import ManageService from '../screens/ManageService';
import { SearchService } from '../screens/SearchService';

import { CreateCategory } from '../screens/CreateCategory';
import ManageCategory from '../screens/ManageCategory';
import { SearchCategory } from '../screens/SearchCategory';
import { Login } from '../screens/Login';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
    Home: undefined;
    ShowProfile: undefined;
    CreateProduct: undefined;
    ManageProduct: undefined;
    SearchProduct: undefined;
    CreateService: undefined;
    ManageService: undefined;
    SearchService: undefined;
    CreateCategory: undefined;
    ManageCategory: undefined;
    SearchCategory: undefined;
    Login: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function AppRoute() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen 
                    name='Home' 
                    component={Home} 
                    options={() => ({
                        header: () => <Header activateBackButton={false} title="INÍCIO" icon={require('../assets/images/cachorro.png')} />
                    })}
                />
                <Stack.Screen 
                    name='ShowProfile' 
                    component={ShowProfile} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="PERFIL" icon={require('../assets/images/perfil.png')} />
                    })}
                />
                {/* All other screens remain the same */}
                <Stack.Screen 
                    name='CreateProduct' 
                    component={CreateProduct} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="CADASTRAR" icon={require('../assets/images/icone-menu.png')} />
                    })}
                />
                {/* ... keep all other existing screen configurations ... */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}