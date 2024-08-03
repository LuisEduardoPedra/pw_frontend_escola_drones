import { getToken } from '../seguranca/Autenticacao';

export const getAlunosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/aluno`,
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

export const getAlunoPorCodigoAPI = async codigo => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/aluno/${codigo}`,
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

export const deleteAlunoAPI = async codigo => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/aluno/${codigo}`,
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

export const cadastraAlunoAPI = async (objeto, metodo) => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/aluno`,
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