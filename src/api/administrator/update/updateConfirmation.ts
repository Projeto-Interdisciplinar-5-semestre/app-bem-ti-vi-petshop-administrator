import { GLOBAL_VAR } from "../../config/globalVar";
import { Error } from "../../../utils/Types";

export async function updateConfirmationEmail(administratorId: string, code: string): Promise<boolean | Error> {

    try {
        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/administradores/${administratorId}/confirmacaoemail/${code}`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'PATCH',
        });

        if (response.ok) {
            return true;
        } else {
            const data = await response.json();

            return {
                code: data.code ?? 'UNKNOWN_ERROR',
                status: data.status ?? response.status.toString(),
                message: data.message ?? 'Erro inesperado',
                timestamp: data.timestamp ?? new Date().toISOString(),
                path: data.path ?? `/administradores/${administratorId}/solicitartrocaemail`,
                errorFields: data.errorFields ?? null
            };
        }

    } catch (error) {
        return {
            code: 'NETWORK_ERROR',
            status: '0',
            message: 'Erro de conexão. Verifique sua internet.',
            timestamp: new Date().toISOString(),
            path: `/administradores/${administratorId}/solicitartrocaemail`,
            errorFields: null
        };
    }
};