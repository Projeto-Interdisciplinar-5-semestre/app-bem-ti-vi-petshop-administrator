const API_URL = 'URL'

export async function postCategory( categoria, imagem ){

    try{

        const formData = new FormData();
        formData.append('category', {
            string: JSON.stringify(categoria),
            name: 'category',
            type: 'application/json',
        });

        formData.append('file', {
            uri: imagem,
            name: 'imagem.jpg',
            type: 'image/jpeg',
        });

        const response = await fetch(`${API_URL}categoria/inserir`,{
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