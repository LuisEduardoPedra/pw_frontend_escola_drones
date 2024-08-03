import { getToken } from '../seguranca/Autenticacao';

export const getCursosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/curso`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "authorization" : getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const getCursoPorCodigoAPI = async codigo => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/curso/${codigo}`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "authorization" : getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const deleteCursoAPI = async codigo => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/curso/${codigo}`,
        {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "authorization" : getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraCursoAPI = async (objeto, metodo) => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/curso`,
        {
            method : metodo,
            headers : {
                "Content-Type" : "application/json",
                "authorization" : getToken()
            },
            body : JSON.stringify(objeto)
        });
    const data = await response.json();
    return data;
}