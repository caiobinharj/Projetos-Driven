import Topo from "./Components/Topo.jsx";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Filmes from "./Components/Filmes.jsx";
import { createGlobalStyle } from 'styled-components';
import {useState} from "react";
import Sessoes from "./Components/Sessoes.jsx";
import Assentos from "./Components/Assentos.jsx"
import Sucesso from "./Components/Sucesso.jsx"

    export default function App() {
        const [tudo, setTudo] = useState({idFilme:null, idSessao:null, nomeFilme:null, sessao:{dia:null, hora:null}, assentos:[], nomeComprador:null, cpf:null});
        return (
            <BrowserRouter>
                <GlobalStyle />
                <DivMor>
                    <Interface>
                        <Topo />
                        <Routes>
                            <Route path="/" element={<Filmes tudo={tudo} setTudo={setTudo} />} />
                            <Route path="/sessoes/:idFilme" element={<Sessoes tudo={tudo} setTudo={setTudo} />} />
                            <Route path="/assentos/:idSessao" element={<Assentos tudo={tudo} setTudo={setTudo} />} />
                            <Route path="/sucesso" element={<Sucesso tudo={tudo} setTudo={setTudo} />} />

                        </Routes>
                    </Interface>
                </DivMor>
            </BrowserRouter>
        );
    }

const Interface = styled.div`
    display: flex;
    width: 375px;
    flex-direction: column;
    background-color: #212226;
    align-items: center;

    @media (max-width: 375px) {
        width: 100vw;
    }
    
    
`;

const DivMor= styled.div`
display:flex;
justify-content: center`

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  body {
    background: white;
  }

  button, a {
    cursor: pointer;
  }
`;