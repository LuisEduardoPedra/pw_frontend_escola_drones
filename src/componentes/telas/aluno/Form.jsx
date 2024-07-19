import React, { useContext, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'tailwindcss/tailwind.css';
import 'react-tabs/style/react-tabs.css';
import AlunoContext from "./AlunoContext";
import Alerta from "../../comuns/Alerta";
import CampoEntrada from "../../comuns/CampoEntrada";
import CampoSelect from "../../comuns/CampoSelect";
import Dialogo from '../../comuns/Dialogo';

function Form() {
    const { objeto, handleChange, acaoCadastrar, alerta, listaCursos, toggleModal, modalOpen } = useContext(AlunoContext);
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <Dialogo id="modalEdicao" titulo="Aluno" modal={modalOpen}
            idform="formulario" acaoCadastrar={acaoCadastrar} toggleModal={toggleModal}>
            <Tabs selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)}>
                <TabList className="flex gap-4">
                    <Tab className="text-white font-medium text-lg px-4 py-2">Dados Pessoais</Tab>
                    <Tab className="text-white font-medium text-lg px-4 py-2">Cursos</Tab>
                </TabList>

                <TabPanel>
                    <Alerta alerta={alerta} />
                    <CampoEntrada
                        id="txtNome"
                        label="Nome"
                        tipo="text"
                        placeholder="Informe o nome"
                        requerido={true}
                        name="nome"
                        value={objeto.nome}
                        onchange={handleChange}
                        msgvalido="Campo nome OK"
                        msginvalido="Informe o nome"
                        readonly={false}
                    />
                    <CampoEntrada
                        id="txtTelefone"
                        label="Telefone"
                        tipo="tel"
                        placeholder="Informe o telefone"
                        requerido={true}
                        name="telefone"
                        value={objeto.telefone}
                        onchange={handleChange}
                        msgvalido="Campo telefone OK"
                        msginvalido="Informe o telefone"
                        readonly={false}
                    />
                    <CampoEntrada
                        id="txtDataNascimento"
                        label="Data de Nascimento"
                        tipo="date"
                        placeholder=""
                        requerido={true}
                        name="data_nascimento"
                        value={objeto.data_nascimento}
                        onchange={handleChange}
                        msgvalido="Campo data de nascimento OK"
                        msginvalido="Informe a data de nascimento"
                        readonly={false}
                    />
                    <CampoEntrada
                        id="txtDataCadastro"
                        label="Data de Cadastro"
                        tipo="date"
                        placeholder=""
                        requerido={true}
                        name="data_cadastro"
                        value={objeto.data_cadastro}
                        onchange={handleChange}
                        msgvalido="Campo data de cadastro OK"
                        msginvalido="Informe a data de cadastro"
                        readonly={true}
                    />
                </TabPanel>

                <TabPanel>
                    <div className="flex flex-col" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {listaCursos.map((curso, index) => (
                            <div key={curso.codigo} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`curso-${curso.codigo}`}
                                    name={`cursos[${index}].ativo`}
                                    value={curso.codigo}
                                    checked={objeto.cursos.some((c) => c.curso_codigo === curso.codigo)}
                                    onChange={handleChange}
                                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                />
                                <label htmlFor={`curso-${curso.codigo}`} className="ml-2 text-sm text-white">
                                    {curso.nome}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {objeto.cursos.map((curso, index) => (
                            <div key={index} className="mt-4">
                                <CampoEntrada
                                    id={`txtCursoCodigo-${curso.curso_codigo}`}
                                    label="Código do Curso"
                                    tipo="text"
                                    placeholder="Código do Curso"
                                    requerido={true}
                                    name={`cursos[${index}].curso_codigo`}
                                    value={curso.curso_codigo}
                                    onchange={handleChange}
                                    msgvalido="Código do curso OK"
                                    msginvalido="Informe o código do curso"
                                    readonly={true}
                                />
                                <CampoEntrada
                                    id={`txtCursoNome-${curso.curso_codigo}`}
                                    label="Nome do Curso"
                                    tipo="text"
                                    placeholder="Nome do Curso"
                                    requerido={false}
                                    name={`cursos[${index}].curso_nome`}
                                    value={curso.curso_nome}
                                    onchange={handleChange}
                                    msgvalido="Nome do curso OK"
                                    msginvalido="Informe o nome do curso"
                                    readonly={true}
                                />
                                <CampoEntrada
                                    id={`txtCursoNota-${curso.curso_codigo}`}
                                    label="Nota do Curso"
                                    tipo="number"
                                    placeholder="Nota do Curso"
                                    requerido={true}
                                    name={`cursos[${index}].curso_nota`}
                                    value={curso.curso_nota}
                                    onchange={handleChange}
                                    msgvalido="Nota do curso OK"
                                    msginvalido="Informe a nota do curso"
                                    readonly={false}
                                />
                                <CampoEntrada
                                    id={`txtFrequencia-${curso.curso_codigo}`}
                                    label="Frequência"
                                    tipo="number"
                                    placeholder="100"
                                    requerido={true}
                                    name={`cursos[${index}].frequencia`}
                                    value={curso.frequencia}
                                    onchange={handleChange}
                                    msgvalido="Frequência OK"
                                    msginvalido="Informe a frequência"
                                    readonly={false}
                                />
                                <CampoSelect
                                    id={`txtAtivo-${curso.curso_codigo}`}
                                    label="Ativo"
                                    requerido={true}
                                    name={`cursos[${index}].ativo`}
                                    value={curso.ativo}
                                    onchange={handleChange}
                                    msgvalido="Campo ativo OK"
                                    msginvalido="Informe se está ativo"
                                    readonly={false}
                                >
                                    <option value={true}>SIM</option>
                                    <option value={false}>NÃO</option>
                                </CampoSelect>
                                {index < objeto.cursos.length - 1 && <hr className="my-4 border-gray-300" />}
                            </div>
                        ))}
                    </div>
                </TabPanel>
            </Tabs>
        </Dialogo>
    );
}

export default Form;
