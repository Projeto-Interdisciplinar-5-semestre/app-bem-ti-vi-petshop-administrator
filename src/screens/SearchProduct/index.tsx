import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';

import { NavigationBar } from '../../components/NavigationBar';
import { SearchInput } from '../../components/SearchInput';
import { Button } from '../../components/Button';
import { ListProduct } from '../../components/ListItems/ListProduct';
import { PaginationControls } from '../../components/PaginationControls';

import { styles } from './style';

import { searchProduct } from '../../api/product/search/searchProduct';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../routes/index';

type ProdutoType = {
    id: number;
    name: string;
    category: string;
    price: string;
};


export const SearchProduct = () => {
    const { navigate } = useNavigation<NavigationProps>();
    const [searchText, setSearchText] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [produtos, setProdutos] = useState<ProdutoType[]>([]);

    const filteredProdutos = produtos.filter(produto =>
        produto.name.toLowerCase().includes(searchText.toLowerCase()) ||
        produto.category.toLowerCase().includes(searchText.toLowerCase())
    );
    
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            async function carregarProdutos() {
                const data = await searchProduct(searchText, pageIndex);
                setProdutos(data?.produtos || []);
                setTotalPages(data?.totalDePaginas || []);
            }

            carregarProdutos();
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
                    action={() => navigate('CreateProduct')} 
                />

                <SearchInput
                    placeholder="Buscar produto..."
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                <ListProduct filteredItems={filteredProdutos} />

               <PaginationControls 
                    pageIndex={pageIndex}
                    totalPages={totalPages}
                    onNext={()=>setPageIndex(prev => prev + 1)}
                    onPrev={()=>setPageIndex(prev => prev - 1)}
               />
               
            </ScrollView>

            <NavigationBar initialTab='loja'/>
        </SafeAreaView>
    );
};