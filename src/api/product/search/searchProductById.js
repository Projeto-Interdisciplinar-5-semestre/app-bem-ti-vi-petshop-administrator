const API_URL = 'URL'

export async function searchProductById( productId ){

    try {

        const response = await fetch(`${API_URL}produto/${productId}/buscar`,{
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