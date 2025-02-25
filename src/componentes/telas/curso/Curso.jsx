import { useState, useEffect } from "react";
import CursoContext from "./CursoContext";
import { getCursosAPI, getCursoPorCodigoAPI, deleteCursoAPI, cadastraCursoAPI } from "../../../servicos/CursoServico";
import {
    getAlunosAPI
} from "../../../servicos/AlunoServico";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom"

function Curso() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaAlunos, setListaAlunos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "",
        nome: "",
        descricao: "",
        valor: "",
        data_cadastro: new Date().toISOString().slice(0, 10),
        carga_horaria: "",
        alunos: []
    });

    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: "",
            nome: "",
            descricao: "",
            valor: "",
            data_cadastro: new Date().toISOString().slice(0, 10),
            carga_horaria: "",
            alunos: []
        });
        setModalOpen(true);
    }

    const editarObjeto = async (codigo) => {
        try {
            const curso = await getCursoPorCodigoAPI(codigo);
            setObjeto(curso);
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
            let retornoAPI = await cadastraCursoAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("login", { replace: true });
        }
        recuperaCursos();
        setModalOpen(false);
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const [mainField, index, subField] = name.split(/[\[\].]/).filter(Boolean);

        setObjeto(prevState => {
            if (mainField === 'alunos') {
                let updatedAlunos = [...prevState.alunos];
                const alunoCodigo = parseInt(value, 10);

                if (type === 'checkbox' && subField === 'ativo') {
                    if (checked) {
                        // Adiciona o aluno se não estiver presente
                        if (!updatedAlunos.some(aluno => aluno.codigo === alunoCodigo)) {
                            const alunoSelecionado = listaAlunos.find(aluno => aluno.codigo === alunoCodigo);
                            if (alunoSelecionado) {
                                updatedAlunos.push({
                                    codigo: alunoSelecionado.codigo,
                                    nome: alunoSelecionado.nome,
                                    ativo: true // Definido como true para alunos adicionados
                                });
                            }
                        }
                    } else {
                        // Remove o aluno se estiver presente
                        updatedAlunos = updatedAlunos.filter(aluno => aluno.codigo !== alunoCodigo);
                    }
                } else {
                    // Atualiza os campos específicos do aluno
                    if (updatedAlunos[index]) {
                        updatedAlunos[index] = {
                            ...updatedAlunos[index],
                            [subField]: type === 'checkbox'
                                ? checked
                                : (subField === 'nota' || subField === 'frequencia')
                                    ? value === '' ? '' : parseFloat(value).toFixed(2) // Corrige valores vazios e NaN
                                    : value
                        };
                    } else {
                        const alunoSelecionado = listaAlunos.find(aluno => aluno.codigo === alunoCodigo);
                        if (alunoSelecionado) {
                            const novoAluno = {
                                codigo: alunoSelecionado.codigo,
                                nome: alunoSelecionado.nome,
                                [subField]: type === 'checkbox'
                                    ? checked
                                    : (subField === 'nota' || subField === 'frequencia')
                                        ? value === '' ? '' : parseFloat(value).toFixed(2) // Corrige valores vazios e NaN
                                        : value
                            };
                            updatedAlunos.push(novoAluno);
                        }
                    }
                }

                return { ...prevState, alunos: updatedAlunos };
            } else {
                return { ...prevState, [name]: value };
            }
        });
    };



    const [carregando, setCarregando] = useState(false);

    const recuperaCursos = async () => {
        setCarregando(true);
        try {
            const resposta = await getCursosAPI();
            if (resposta.status === "success" && Array.isArray(resposta.objeto)) {
                setListaObjetos(resposta.objeto);
            } else {
                console.error("Erro ao recuperar cursos:", resposta.message);
                setListaObjetos([]);
            }
        } catch (error) {
            console.error("Erro ao recuperar cursos:", error);
            setListaObjetos([]);
            window.location.reload();
            navigate("login", { replace: true });
        }
        setCarregando(false);
    }

    const recuperaAlunos = async () => {
        setCarregando(true);
        try {
            const resposta = await getAlunosAPI();
            if (Array.isArray(resposta)) {
                setListaAlunos(resposta);
            } else {
                console.error("Erro ao recuperar alunos: resposta inesperada", resposta);
                setListaAlunos([]);
            }
        } catch (error) {
            console.error("Erro ao recuperar alunos:", error);
            setListaAlunos([]);
            window.location.reload();
            navigate("login", { replace: true });
        }
        setCarregando(false);
    };

    const remover = async (codigo) => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteCursoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaCursos();
            } catch (err) {
                window.location.reload();
                navigate("login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaCursos();
        recuperaAlunos();

    }, []);

    return (
        <CursoContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, acaoCadastrar, handleChange, novoObjeto, editarObjeto,
            listaAlunos, toggleModal, modalOpen
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            {modalOpen && <Form />}
        </CursoContext.Provider>
    );
}

export default WithAuth(Curso);
