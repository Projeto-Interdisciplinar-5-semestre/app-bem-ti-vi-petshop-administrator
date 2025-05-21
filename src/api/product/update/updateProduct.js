const API_URL = 'URL'

export async function updateProduct( produto, imagem, productId ){

        const formData = new FormData();

        formData.append('product', {
            string: JSON.stringify(produto),
            name: 'product',
            type: 'application/json',
        });

        formData.append('file', {
            uri: imagem,
            name: 'imagem.jpg',
            type: 'image/jpeg',
        });

        try {
            const response = await fetch(`${API_URL}produto/${productId}/atualizar`, {
                method: 'PUT',
                body: formData,
            });

            if (response.status === 200) {
                return true;
            } else {
                console.error(`Erro ao atualizar: código ${response.status}`);
                return false;
            }

        } catch (error) {
            console.error('Erro na requisição UPDATE: ', error)
            throw error;
        }
    };