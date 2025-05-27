import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';

import { NavigationBar } from '../../components/NavigationBar';
import { SearchInput } from '../../components/SearchInput';
import { Button } from '../../components/Button';
import { ListCategory } from '../../components/ListItems/ListCategory';
import { PaginationControls } from '../../components/PaginationControls';

import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../routes/index';

import { searchCategory } from '../../api/category/search/searchCategory';

type CategoriaType = {
    id: number;
    nome: string;
    imagem: any;
};

export const SearchCategory = () => {
    const { navigate } = useNavigation<NavigationProps>();
    const [searchText, setSearchText] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [categorias, setCategorias] = useState<CategoriaType[]>([]);

    const filteredCategorias = categorias.filter(categoria =>
        categoria.nome.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            async function carregarCategorias() {
                const data = await searchCategory(searchText, pageIndex);
                setCategorias(data?.categorias || []);
                setTotalPages(data?.totalDePaginas || []);
            }

            carregarCategorias();
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
                    action={() => navigate('CreateCategory')} 
                />

                <SearchInput
                    placeholder="Buscar categoria..."
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                {/* Lista de Categorias */}
                <ListCategory filteredItems={filteredCategorias} />

                <PaginationControls 
                    pageIndex={pageIndex}
                    totalPages={totalPages}
                    onNext={()=>setPageIndex(prev => prev + 1)}
                    onPrev={()=>setPageIndex(prev => prev - 1)}
                />

            </ScrollView>

            <NavigationBar initialTab='categorias'/>
        </SafeAreaView>
    );
};
