import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, } from 'react-native';

import { NavigationBar } from '../../components/NavigationBar';
import { SearchInput } from '../../components/SearchInput';
import { Button } from '../../components/Button';
import { ListService } from '../../components/ListItems/ListService';
import { PaginationControls } from '../../components/PaginationControls';

import { styles } from './style';

import { searchService } from '../../api/service/search/searchService';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../routes/index';

type ServicoType = {
    id: number;
    name: string;
    price: string;
    image: any;
    description: string;
    estimated_duration: string;
};

export const SearchService = () => {
    const { navigate } = useNavigation<NavigationProps>()
    const [searchText, setSearchText] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [servicos, setServicos] = useState<ServicoType[]>([]);

    const filteredServicos = servicos.filter(servico =>
        servico.name.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            async function carregarServicos() {
                const data = await searchService(searchText, pageIndex);
                setServicos(data?.servicos || []);
                setTotalPages(data?.totalDePaginas || []);
            }

            carregarServicos();
        }, 750);

        return () => clearTimeout(delayDebounce);
    }, [searchText,pageIndex]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

                <Button 
                    icon={require('../../assets/images/add.png')} 
                    text="CADASTRAR" 
                    color="#256489" 
                    action={() => navigate('CreateService')} 
                />

                <SearchInput
                    placeholder="Buscar serviço..."
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                <ListService filteredItems={filteredServicos} />
               
                <PaginationControls 
                    pageIndex={pageIndex}
                    totalPages={totalPages}
                    onNext={()=>setPageIndex(prev => prev + 1)}
                    onPrev={()=>setPageIndex(prev => prev - 1)}
                />

            </ScrollView>

            <NavigationBar initialTab='servicos'/>
        </SafeAreaView>
    );
};
