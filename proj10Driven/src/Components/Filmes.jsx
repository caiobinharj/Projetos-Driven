import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Filmes({ setTudo }) {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");
        promise.then((response) => {
            setFilmes(response.data);
        });
        promise.catch(erro => console.log(erro.response.data));
    }, []);

    return (
        <Corpo>
            <ContainerTexto>
                <Texto>
                    Em Cartaz
                </Texto>
            </ContainerTexto>
            <ContainerFilmes>
                {filmes.map((filme) => (
                    <Filme
                        key={filme.id}
                        to={`/sessoes/${filme.id}`}
                        onClick={() => setTudo(prevState => ({
                            ...prevState,
                            idFilme: filme.id,
                            nomeFilme: filme.title
                        }))}
                    >
                        <img src={filme.posterURL} alt={filme.title} />
                    </Filme>
                ))}
            </ContainerFilmes>
        </Corpo>
    )
}


const Corpo = styled.div`
    background-color: #212226;
`;

const ContainerTexto = styled.div`
    height: 78px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 375px) {
        width: 100vw;
    }
`;

const Texto = styled.p`
    font-family: 'Sarala', sans-serif;
    color: #ffffff;
    font-size: 24px;
`;

const ContainerFilmes = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;

    @media (max-width: 375px) {
        flex-direction: column; 
    }
`;

const Filme = styled(Link)`
    width: 145px;
    height: 210px;
    
   

    img {
        width: 145px;
        height: 210px;
        object-fit: cover;
        border-radius:8px;
        
        
    }
`;