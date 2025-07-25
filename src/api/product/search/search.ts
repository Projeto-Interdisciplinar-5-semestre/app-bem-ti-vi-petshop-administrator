import { Product } from "../../../utils/Types";
import { GLOBAL_VAR } from "../../config/globalVar";

export type ProductPages = {
    product: Product[],
    totalPages: number
}

export async function search(searchText: string, pageIndex: number): Promise<ProductPages | undefined> {
    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/produtos/paginacao?isActive=true&pageSize=3&page=${pageIndex}&name=${searchText}`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'GET',
        })

        if (!response.ok) {
            console.error(`Algo errado no response: ${response.status}`)
        }

        const data = await response.json()

        const products: Product[] = data.content.map((item: Product) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            pathImage: item.pathImage,
            description: item.description,
            categories: item.categories,
            activationStatus:item.activationStatus,
            rate:item.rate,
        }));

        return {
            product: products,
            totalPages: data.totalPages
        }

    } catch (error) {
        console.error('Erro na requisição: ', error)
    }
}
