const API_URL = 'URL'

export async function searchCategory( searchText, pageIndex ){

    try {

        const response = await fetch(`${API_URL}categoria/paginacao?isActive=true&pageSize=10&page=${pageIndex}&name=${searchText}`,{
            method: 'GET',
        })

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`)
        }

        const data = await response.json()
        
        const categoriasFormatadas = data.content.map((item) => ({
            id: item.id,
            nome: item.name,
            imagem: item.pathImage,
        }));
        
        return {
            categorias: categoriasFormatadas,
            totalDePaginas:data.totalPages
        }
    } catch (error) {
        console.error('Erro na requisição: ', error)
    }
}