const API_URL = 'URL'

export async function searchServiceById( serviceId ){

    try {

        const response = await fetch(`${API_URL}service/${serviceId}/buscar`,{
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