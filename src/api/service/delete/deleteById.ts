import { GLOBAL_VAR } from "../../config/globalVar";

export async function deleteById(serviceId: string) {

    try {
        const response = await fetch(`${GLOBAL_VAR.BASE_URL}/servicos/${serviceId}/deletar`, {
            headers: {
                Authorization: "Bearer " + GLOBAL_VAR.TOKEN_JWT
            },
            method: 'DELETE',
        })

        if (response.status === 204) {
            return true;
        } else {
            const data = await response.json();

            return {
                code: data.code ?? 'UNKNOWN_ERROR',
                status: data.status ?? response.status.toString(),
                message: data.message ?? 'Erro inesperado',
                timestamp: data.timestamp ?? new Date().toISOString(),
                path: data.path ?? `/servicos/${serviceId}/deletar`,
                errorFields: data.errorFields ?? null
            };
        }

    } catch (error) {
        return {
            code: 'NETWORK_ERROR',
            status: '0',
            message: 'Erro de conexão. Verifique sua internet.',
            timestamp: new Date().toISOString(),
            path: `/servicos/${serviceId}/deletar`,
            errorFields: null
        };
    }
}