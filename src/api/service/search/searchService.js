const API_URL = 'URL'

export async function searchService( searchText, pageIndex ){

    try {

        const response = await fetch(`${API_URL}service/paginacao?isActive=true&pageSize=3&page=${pageIndex}&name=${searchText}`,{
            method: 'GET',
        })

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`)
        }

        const data = await response.json()
        
        const servicosFormatados = data.content.map((item) => ({
            id: item.id,
            name: item.name,
            image: item.pathImage,
            price: item.price,
            description: item.description,
            estimated_duration: item.estimated_duration,
        }));
        
        return {
            servicos:servicosFormatados,
            totalDePaginas:data.totalPages
        }

    } catch (error) {
        console.error('Erro na requisição: ', error)
    }
}