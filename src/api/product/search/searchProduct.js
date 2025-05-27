const API_URL = 'URL'

export async function searchProduct( searchText, pageIndex ){

    try {

        const response = await fetch(`${API_URL}produto/paginacao?isActive=true&pageSize=3&page=${pageIndex}&name=${searchText}`,{
            method: 'GET',
        })

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`)
        }

        const data = await response.json()
        
        const produtosFormatados = data.content.map((item) => ({
            id: item.id,
            name: item.name,
            category: item.categories?.[0].name,
            price: item.price,
            imagem: item.pathImage,
        }));
        
        return {
            produtos:produtosFormatados,
            totalDePaginas:data.totalPages
        }

    } catch (error) {
        console.error('Erro na requisição: ', error)
    }
}