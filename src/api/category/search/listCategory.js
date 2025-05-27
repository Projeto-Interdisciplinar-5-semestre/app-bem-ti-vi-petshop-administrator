const API_URL = 'URL'

export async function listCategory(){

    try {

        const response = await fetch(`${API_URL}categoria/paginacao?isActive=true&pageSize=30&page=0`,{
            method: 'GET',
        })

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`)
        }

        const data = await response.json()
        
        const categoriasFormatadas = data.content.map((item) => ({
            label: item.name,
            value: item.id,
        }));
        
        return categoriasFormatadas
    } catch (error) {
        console.error('Erro na requisição: ', error)
    }
}