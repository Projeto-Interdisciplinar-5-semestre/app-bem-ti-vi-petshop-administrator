const API_URL = 'URL'

export async function searchCategoryById( serviceId ){

    try {

        const response = await fetch(`${API_URL}categoria/${serviceId}/buscar`,{
            method: 'GET',
        })

        if (!response.ok){
            console.error(`Algo errado no response: ${response.status}`)
        }

        const data = await response.json()
        
        return data

    } catch (error) {
        console.error('Erro na requisição: ', error)
    }
}