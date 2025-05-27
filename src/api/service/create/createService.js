const API_URL = 'URL'

export async function postService( servico, imagem ){

    try{

        const formData = new FormData();
        formData.append('service', {
            string: JSON.stringify(servico),
            name: 'service',
            type: 'application/json',
        });

        formData.append('file', {
            uri: imagem,
            name: 'imagem.jpg',
            type: 'image/jpeg',
        });

        const response = await fetch(`${API_URL}service/inserir`,{
            method:'POST',
            body:formData,
        });

        if (response.status === 201) {
            return true;
        } else {
            console.error(`Erro ao cadastrar: código ${response.status}`);
            return false;
        }
    } catch( error ){
        console.error('Erro na requisição POST: ', error)
        throw error;
    }
} 