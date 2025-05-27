const API_URL = 'URL'

export async function deleteService( serviceId ){

    try {

        const response = await fetch(`${API_URL}service/${serviceId}/deletar`,{
            method: 'DELETE',
        })

        if (response.status === 204) {
            return true;
        } else {
            console.error(`Erro ao excluir: código ${response.status}`);
            return false;
        }
    } catch (error) {
        console.error('Erro na requisição DELETE: ', error)
    }
}