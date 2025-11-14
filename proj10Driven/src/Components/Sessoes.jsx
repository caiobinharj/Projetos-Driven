import styled from "styled-components";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sessoes({ setTudo }) {
    const { idFilme } = useParams();
    const [sessoes, setSessoes] = useState([]);

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`)
            .then(response => {
                setSessoes(response.data.days);
                setTudo(prev => ({
                    ...prev,
                    idFilme: idFilme,
                    nomeFilme: response.data.title
                }));
            })
            .catch(error => console.log(error.response.data));
    }, [idFilme, setTudo]);

    const handleSelectSession = (sessionId, day, time) => {
        setTudo(prev => ({
            ...prev,
            idSessao: sessionId,
            sessao: {
                ...prev.sessao,
                dia: day,
                hora: time
            }
        }));
    };


    return (
        <Corpo>
            <ContainerTexto>
                <Texto>Selecione o horário</Texto>
            </ContainerTexto>

            <CardapioSessoes>
                {sessoes.map((dia) => (
                    <ContainerDia key={dia.id}>
                        <Dia>
                            {dia.weekday}, {dia.date}
                        </Dia>
                        <Barra></Barra>
                        <Horarios>
                            {dia.showtimes.map((sessao) => (
                                <Link
                                    key={sessao.id}
                                    to={`/assentos/${sessao.id}`}
                                >
                                    <SessaoButton
                                        onClick={() => handleSelectSession(
                                            sessao.id,
                                            dia.date,
                                            sessao.name
                                        )}
                                    >
                                        {sessao.name}
                                    </SessaoButton>
                                </Link>
                            ))}
                        </Horarios>
                    </ContainerDia>
                ))}
            </CardapioSessoes>
        </Corpo>
    );
}

const Corpo = styled.div`
    background-color: #212226;
    min-height: 100vh;
    padding-bottom: 20px;
`;

const ContainerTexto = styled.div`
    height: 78px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Texto = styled.p`
    font-family: 'Sarala', sans-serif;
    color: #ffffff;
    font-size: 24px;
`;

const CardapioSessoes = styled.div`
    
`;

const ContainerDia = styled.div`
    margin-bottom: 30px;
    border-radius:8px;

    background-color: #2b2d36;
    width:338px;
    height:149px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    @media (max-width: 375px) {
        width: 99vw;
    }
`;

const Dia = styled.p`
    font-family: 'Sarala', sans-serif;
    color: #ffffff;
    font-size: 20px;
    margin-bottom: 15px;
`;

const Horarios = styled.div`
    display: flex;
    gap: 20px;
`;

const SessaoButton = styled.button`
    width: 83px;
    height: 43px;
    border: 2px solid #EE897F;
    border-radius: 8px;
    background-color: #2b2d36;
    color: #ee897f;
    font-family: 'Sarala', sans-serif;
    font-size: 18px;
    cursor: pointer;
    &:hover {
        filter: brightness(0.9);
    }
`;

const Barra = styled.div`
    background-color:#4e5a65;
    height:1px;
    width:302px;
    @media (max-width: 375px) {
        width: 80vw;
    }
`