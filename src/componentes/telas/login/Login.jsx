import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { gravaAutenticacao, getToken } from '../../../seguranca/Autenticacao';
import Carregando from '../../comuns/Carregando';
import Alerta from '../../comuns/Alerta';
import './signin.css';

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const acaoLogin = async e => {
        e.preventDefault();
        try {
            const body = { email, senha };
            setCarregando(true);
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }).then(response => response.json())
                .then(json => {
                    if (json.auth === false) {
                        setAlerta({ status: "error", message: json.message });
                    }
                    if (json.auth === true) {
                        setAutenticado(true);
                        gravaAutenticacao(json);
                    }
                });
        } catch (err) {
            setAlerta({ status: "error", message: err.message });
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        try {
            const token = getToken();
            if (token != null) {
                setAutenticado(true);
            }
        } catch (err) {
            setAlerta({ status: "error", message: err?.message || "" });
        }
    }, []);

    if (autenticado) {
        return <Navigate to="/privado" />
    }

    return (
        <div>

            <div className="main-content flex flex-col items-center justify-center">
                <Carregando carregando={carregando}>
                    <div className="form-signin">
                        <Alerta alerta={alerta} />
                        <form onSubmit={acaoLogin}>
                            <h1 className="text-gray-800">Login de usuário</h1>
                            <div className="form-floating">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="floatingInput" 
                                    placeholder=""
                                    value={email}
                                    name="email"
                                    onChange={e => setEmail(e.target.value)} 
                                />
                                <label htmlFor="floatingInput">Email</label>
                            </div>
                            <div className="form-floating">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="floatingPassword" 
                                    placeholder=""
                                    value={senha}
                                    name="senha"
                                    onChange={e => setSenha(e.target.value)} 
                                />
                                <label htmlFor="floatingPassword">Senha</label>
                            </div>
                            <button 
                                className="btn btn-primary"
                                type="submit"
                            >
                                Efetuar login
                            </button>
                        </form>
                    </div>
                </Carregando>
            </div>
        </div>
    );
}

export default Login;
