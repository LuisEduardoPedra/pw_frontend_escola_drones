import { useState, useEffect } from "react";
import AlunoContext from "./AlunoContext";
import { getCursosAPI } from "../../../servicos/CursoServico";
import {
    getAlunosAPI, getAlunoPorCodigoAPI,
    deleteAlunoAPI, cadastraAlunoAPI
} from "../../../servicos/AlunoServico";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";

function Aluno() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaCursos, setListaCursos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
        data_nascimento: new Date().toISOString().slice(0, 10),
        data_cadastro: new Date().toISOString().slice(0, 10),
        telefone: "", cursos: []
    });

    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: "", nome: "",
            data_nascimento: new Date().toISOString().slice(0, 10),
            data_cadastro: new Date().toISOString().slice(0, 10),
            telefone: "", cursos: []
        });
        setModalOpen(true);
    }

    const editarObjeto = async (codigo) => {
        const aluno = await getAlunoPorCodigoAPI(codigo);
        setObjeto(aluno);
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setModalOpen(true);
    };

    const acaoCadastrar = async (e) => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraAlunoAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
        }
        recuperaAlunos();
        setModalOpen(false);
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const [mainField, index, subField] = name.split(/[\[\].]/).filter(Boolean);
    
        setObjeto(prevState => {
            if (mainField === 'cursos') {
                let updatedCursos = [...prevState.cursos];
                if (type === 'checkbox' && subField === 'ativo' && !checked) {

                    updatedCursos = updatedCursos.filter(c => c.curso_codigo !== parseInt(value));
                } else {
                    if (updatedCursos[index]) {
                        updatedCursos[index] = {
                            ...updatedCursos[index],
                            [subField]: type === 'checkbox' ? checked : value
                        };
                    } else {

                        const cursoSelecionado = listaCursos.find(curso => curso.codigo === parseInt(value));
                        if (cursoSelecionado) {
                            const novoCurso = {
                                curso_codigo: parseInt(value),
                                curso_nome: cursoSelecionado.nome, 
                                [subField]: type === 'checkbox' ? checked : value
                            };
                            updatedCursos.push(novoCurso);
                        }
                    }
                }
                return { ...prevState, cursos: updatedCursos };
            } else {
                return { ...prevState, [name]: value };
            }
        });
    };
    
    

    const [carregando, setCarregando] = useState(false);

    const recuperaAlunos = async () => {
        setCarregando(true);
        setListaObjetos(await getAlunosAPI());
        setCarregando(false);
    }

    const recuperaCursos = async () => {
        try {
            const cursos = await getCursosAPI();
            if (cursos.objeto && Array.isArray(cursos.objeto)) {
                setListaCursos(cursos.objeto);
            } else {
                setListaCursos([]);
            }
        } catch (error) {
            console.error("Erro ao recuperar cursos:", error);
            setListaCursos([]);
        }
    }    

    const remover = async (codigo) => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteAlunoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaAlunos();
        }
    }

    useEffect(() => {
        recuperaAlunos();
        recuperaCursos();
    }, []);

    return (
        <AlunoContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, acaoCadastrar, handleChange, novoObjeto, editarObjeto,
            listaCursos, toggleModal, modalOpen
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            {modalOpen && <Form />}
        </AlunoContext.Provider>
    );
}

export default Aluno;
