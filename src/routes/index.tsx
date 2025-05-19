import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Home } from '../screens/Home';
import { Header } from '../components/Header';
import { ShowProfile } from '../screens/ShowProfile';
import { ListAdmScreen } from '../screens/ListAdmScreen';
import { ManageProfile } from '../screens/ManageProfile';

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
    ListAdm: undefined;
    ManageProfile: undefined;
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
                <Stack.Screen 
                    name='ListAdm' 
                    component={ListAdmScreen} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="ADMINISTRADORES" icon={require('../assets/images/adms.png')} />
                    })}
                />
                <Stack.Screen 
                    name='ManageProfile' 
                    component={ManageProfile} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="GERENCIAR PERFIL" icon={require('../assets/images/perfil.png')} />
                    })}
                />
                <Stack.Screen 
                    name='CreateProduct' 
                    component={CreateProduct} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="CADASTRAR" icon={require('../assets/images/icone-menu.png')} />
                    })}
                />
                <Stack.Screen 
                    name='ManageProduct' 
                    component={ManageProduct} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="GERENCIAR" icon={require('../assets/images/icone-menu.png')} />
                    })}
                />
                <Stack.Screen 
                    name='SearchProduct' 
                    component={SearchProduct} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="PRODUTOS" icon={require('../assets/images/icone-menu.png')} />
                    })}
                />
                <Stack.Screen 
                    name='CreateService' 
                    component={CreateService} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="CADASTRAR" icon={require('../assets/images/cachorro.png')} />
                    })}
                />
                <Stack.Screen 
                    name='ManageService' 
                    component={ManageService} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="GERENCIAR" icon={require('../assets/images/cachorro.png')} />
                    })}
                />
                <Stack.Screen 
                    name='SearchService' 
                    component={SearchService} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="SERVIÇOS" icon={require('../assets/images/cachorro.png')} />
                    })}
                />
                <Stack.Screen 
                    name='CreateCategory' 
                    component={CreateCategory} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="CADASTRAR" icon={require('../assets/images/categorias.png')} />
                    })}
                />
                <Stack.Screen 
                    name='ManageCategory' 
                    component={ManageCategory} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="GERENCIAR" icon={require('../assets/images/categorias.png')} />
                    })}
                />
                <Stack.Screen 
                    name='SearchCategory' 
                    component={SearchCategory} 
                    options={() => ({
                        header: () => <Header activateBackButton={true} title="CATEGORIAS" icon={require('../assets/images/categorias.png')} />
                    })}
                />
                <Stack.Screen 
                    name='Login' 
                    component={Login} 
                    options={() => ({
                        header: () => <></>
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}