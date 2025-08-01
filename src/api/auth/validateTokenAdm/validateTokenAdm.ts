import { AdministratorId } from "../../../utils/Types";
import { GLOBAL_VAR } from "../../config/globalVar"

export async function validateTokenAdm(): Promise<AdministratorId | undefined> {
    try {

        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/autenticacao/token/administrador`,{
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'GET',
        })

        if (!response.ok) {
            return undefined;
        }

        const administratorId: AdministratorId = await response.json()
        
        return administratorId;

    } catch (error) {
        console.error('Erro na requisição: ', error)
    }
}