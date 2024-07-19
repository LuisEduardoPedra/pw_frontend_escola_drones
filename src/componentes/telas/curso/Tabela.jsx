import { useContext } from "react";
import CursoContext from "./CursoContext";
import Alerta from "../../comuns/Alerta";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faUserXmark, faUserPlus } from '@fortawesome/free-solid-svg-icons'

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } =
        useContext(CursoContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1 class="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Listagem de</span> Cursos.</h1>
            <Alerta alerta={alerta} />

            <button type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                data-bs-toggle="modal" data-bs-target="#modalEdicao" onClick={() => novoObjeto()}>
                Criar novo
                <FontAwesomeIcon icon={faUserPlus} className="ml-2" />
            </button>

            {listaObjetos.length === 0 &&
                <h1>Nenhum registro encontrado</h1>}

            {listaObjetos.length > 0 &&
                <div className="table-responsive">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >Ações</th>
                                <th className="px-0 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Codigo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carga Horaria</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ativo</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                listaObjetos.map(objeto => (
                                    <tr key={objeto.codigo}>
                                        <td className="px-6 py-4 whitespace-nowrap" >
                                            <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out" title="Editar"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalEdicao"
                                                onClick={() => editarObjeto(objeto.codigo)}>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out" title="Remover"
                                                onClick={() => { remover(objeto.codigo) }}>
                                                <FontAwesomeIcon icon={faUserXmark} />
                                            </button>
                                        </td>
                                        <th scope="row" align="center" >{objeto.codigo}</th>
                                        <td className="px-6 py-4 whitespace-nowrap">{objeto.nome}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{objeto.valor}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{objeto.carga_horaria}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {objeto.alunos && objeto.alunos.some(aluno => aluno.ativo) ? (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Sim
                                                </span>
                                            ) : (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                    Não
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )

}

export default Tabela;