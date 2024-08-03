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
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom"

function Aluno() {

    let navigate = useNavigate();

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
        try {
            const aluno = await getAlunoPorCodigoAPI(codigo);
            setObjeto(aluno);
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setModalOpen(true);
        } catch (err) {
            window.location.reload();
            navigate("login", { replace: true });
        }
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
            window.location.reload();
            navigate("login", { replace: true });
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

                const cursoCodigo = parseInt(value, 10);

                if (type === 'checkbox' && subField === 'ativo') {
                    if (checked) {
                        // Adiciona o curso se não estiver presente
                        if (!updatedCursos.some(curso => curso.curso_codigo === cursoCodigo)) {
                            const cursoSelecionado = listaCursos.find(curso => curso.codigo === cursoCodigo);
                            if (cursoSelecionado) {
                                updatedCursos.push({
                                    curso_codigo: cursoSelecionado.codigo,
                                    curso_nome: cursoSelecionado.nome,
                                    ativo: true
                                });
                            }
                        }
                    } else {
                        // Remove o curso se estiver presente
                        updatedCursos = updatedCursos.filter(curso => curso.curso_codigo !== cursoCodigo);
                    }
                } else {
                    // Atualiza os campos específicos do curso
                    if (updatedCursos[index]) {
                        updatedCursos[index] = {
                            ...updatedCursos[index],
                            [subField]: type === 'checkbox' ? checked : (subField === 'curso_nota' || subField === 'frequencia') ? parseFloat(value) : value
                        };
                    } else {
                        const cursoSelecionado = listaCursos.find(curso => curso.codigo === cursoCodigo);
                        if (cursoSelecionado) {
                            const novoCurso = {
                                curso_codigo: cursoSelecionado.codigo,
                                curso_nome: cursoSelecionado.nome,
                                [subField]: type === 'checkbox' ? checked : (subField === 'curso_nota' || subField === 'frequencia') ? parseFloat(value) : value
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
        try {
            setCarregando(true);
            setListaObjetos(await getAlunosAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("login", { replace: true });
        }

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
            window.location.reload();
            navigate("login", { replace: true });
        }
    }

    const remover = async (codigo) => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteAlunoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaAlunos();
            } catch (err) {
                window.location.reload();
                navigate("login", { replace: true });
            }
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

export default WithAuth(Aluno);
