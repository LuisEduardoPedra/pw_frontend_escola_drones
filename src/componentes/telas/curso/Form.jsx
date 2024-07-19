import React, { useContext, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'tailwindcss/tailwind.css';
import 'react-tabs/style/react-tabs.css';
import CursoContext from "./CursoContext";
import Alerta from "../../comuns/Alerta";
import CampoEntrada from "../../comuns/CampoEntrada";
import CampoSelect from "../../comuns/CampoSelect";
import Dialogo from '../../comuns/Dialogo';

function Form() {
    const { objeto, handleChange, acaoCadastrar, alerta, listaAlunos, toggleModal, modalOpen } = useContext(CursoContext);
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <Dialogo id="modalEdicao" titulo="Curso" modal={modalOpen}
            idform="formulario" acaoCadastrar={acaoCadastrar} toggleModal={toggleModal}>
            <Tabs selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)}>
                <TabList className="flex gap-4">
                    <Tab className="text-white font-medium text-lg px-4 py-2">Curso</Tab>
                    <Tab className="text-white font-medium text-lg px-4 py-2">Alunos</Tab>
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
                        id="txtDescricao"
                        label="Descricao"
                        tipo="textarea"
                        placeholder="Informe uma descricao do curso"
                        requerido={true}
                        name="descricao"
                        value={objeto.descricao}
                        onchange={handleChange}
                        msgvalido="Campo descricao OK"
                        msginvalido="Informe a descricao"
                        readonly={false}
                    />
                    <CampoEntrada
                        id="txtValor"
                        label="Valor"
                        tipo="number"
                        placeholder="Informe o valor do curso"
                        requerido={true}
                        name="valor"
                        value={objeto.valor}
                        onchange={handleChange}
                        msgvalido="Campo valor OK"
                        msginvalido="Informe o valor"
                        readonly={false}
                    />
                    <CampoEntrada
                        id="txtCargaHoraria"
                        label="Carga Horaria"
                        tipo="number"
                        placeholder="Informe a carga horaria do curso"
                        requerido={true}
                        name="carga_horaria"
                        value={objeto.carga_horaria}
                        onchange={handleChange}
                        msgvalido="Campo carga horaria OK"
                        msginvalido="Informe a carga horaria"
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
                        {listaAlunos.map((aluno, index) => (
                            <div key={aluno.codigo} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`aluno-${aluno.codigo}`}
                                    name={`alunos[${index}].ativo`}
                                    value={aluno.codigo}
                                    checked={objeto.alunos.some((a) => a.codigo === aluno.codigo)}
                                    onChange={handleChange}
                                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                />
                                <label htmlFor={`aluno-${aluno.codigo}`} className="ml-2 text-sm text-white">
                                    {aluno.nome}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {objeto.alunos.map((aluno, index) => (
                            <div key={index} className="mt-4">
                                <CampoEntrada
                                    id={`txtAlunoCodigo-${aluno.codigo}`}
                                    label="Código do Aluno"
                                    tipo="text"
                                    placeholder="Código do Aluno"
                                    requerido={true}
                                    name={`alunos[${index}].codigo`}
                                    value={aluno.codigo}
                                    onchange={handleChange}
                                    msgvalido="Código do aluno OK"
                                    msginvalido="Informe o código do aluno"
                                    readonly={true}
                                />
                                <CampoEntrada
                                    id={`txtAlunoNome-${aluno.codigo}`}
                                    label="Nome do Aluno"
                                    tipo="text"
                                    placeholder="Nome do Aluno"
                                    requerido={false}
                                    name={`alunos[${index}].nome`}
                                    value={aluno.nome}
                                    onchange={handleChange}
                                    msgvalido="Nome do aluno OK"
                                    msginvalido="Informe o nome do aluno"
                                    readonly={true}
                                />
                                <CampoEntrada
                                    id={`txtAlunoNota-${aluno.codigo}`}
                                    label="Nota"
                                    tipo="number"
                                    placeholder="Nota do Curso"
                                    requerido={true}
                                    name={`alunos[${index}].curso_nota`}
                                    value={aluno.curso_nota}
                                    onchange={handleChange}
                                    msgvalido="Nota do curso OK"
                                    msginvalido="Informe a nota do curso"
                                    readonly={false}
                                />
                                <CampoEntrada
                                    id={`txtFrequencia-${aluno.codigo}`}
                                    label="Frequência"
                                    tipo="number"
                                    placeholder="100"
                                    requerido={true}
                                    name={`alunos[${index}].frequencia`}
                                    value={aluno.frequencia}
                                    onchange={handleChange}
                                    msgvalido="Frequência OK"
                                    msginvalido="Informe a frequência"
                                    readonly={false}
                                />
                                <CampoSelect
                                    id={`txtAtivo-${aluno.codigo}`}
                                    label="Ativo"
                                    requerido={true}
                                    name={`alunos[${index}].ativo`}
                                    value={aluno.ativo}
                                    onchange={handleChange}
                                    msgvalido="Campo ativo OK"
                                    msginvalido="Informe se está ativo"
                                    readonly={false}
                                >
                                    <option value={true}>SIM</option>
                                    <option value={false}>NÃO</option>
                                </CampoSelect>
                                {index < objeto.alunos.length - 1 && <hr className="my-4 border-gray-300" />}
                            </div>
                        ))}
                    </div>
                </TabPanel>
            </Tabs>
        </Dialogo>
    );
}

export default Form;
