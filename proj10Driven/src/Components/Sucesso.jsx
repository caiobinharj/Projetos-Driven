import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Sucesso({ tudo }) {
    const navigate = useNavigate();

    return (
        <Corpo>
            <ContainerTexto>
                <Texto1>Pedido finalizado!</Texto1>
            </ContainerTexto>

            {tudo && (
                <>
                    <ConteinerFinal>
                        <Texto2>Filme e sessão</Texto2>
                        <Barra />
                        <Texto3>{tudo.nomeFilme || "Não informado"}</Texto3>
                        <Texto3>{tudo.sessao?.dia || "Não informado"}</Texto3>
                        <Texto3>{tudo.sessao?.hora || "Não informado"}</Texto3>

                        <Texto2>Ingressos</Texto2>
                        <Barra />
                        <Texto3>
                            {tudo.assentos?.length > 0 ? (
                                tudo.assentos.map((assento, index) => (
                                    <p key={index}>Assento {assento.id || assento}</p>
                                ))
                            ) : (
                                <p>Nenhum assento selecionado</p>
                            )}
                        </Texto3>

                        <Texto2>Comprador(a)</Texto2>
                        <Barra />
                        <Texto3>Nome: {tudo.nomeComprador || "Não informado"}</Texto3>
                        <Texto3>CPF: {tudo.cpf || "Não informado"}</Texto3>
                    </ConteinerFinal>

                    <ContainerBotao>
                        <BotaoVoltar onClick={() => navigate("/")}>
                            <Texto>Voltar para tela inicial</Texto>
                        </BotaoVoltar>
                    </ContainerBotao>
                </>
            )}
        </Corpo>
    );
}

const Corpo = styled.div`
    background-color: #212226;
    min-height: 100vh;
    padding: 20px;
`;

const ContainerTexto = styled.div`
    height: 78px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Texto1 = styled.p`
    font-family: 'Sarala', sans-serif;
    color: #9d8899;
    font-size: 24px;
    text-align: center;
    
`;

const Texto2 = styled.p`
    font-family: 'Sarala', sans-serif;
    color: #ee897f;
    font-weight:700;
    font-size:22px;
    margin-top:15px;
`;

const Texto3 = styled.p`
    font-family: 'Sarala', sans-serif;
    color: #ffffff;
    font-size: 24px;
    margin-bottom:15px;


`;

const ConteinerFinal = styled.div`
    padding: 0 10px;
    border-radius:8px;
    margin-bottom: 30px;
    background-color: #2b2d36;
    width:338px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    @media (max-width: 375px) {
        width: 99vw;
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

const BotaoVoltar = styled.button`
    padding: 12px 30px;
    background: #ee897f;
    width:338px;
    color: black;
    border: none;
    border-radius: 4px;
    font-family: 'Sarala', sans-serif;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background: #D97634;
    }

    @media (max-width: 375px) {
        width: 90vw;
    }`;

const Texto = styled.p`
    font-family: 'Sarala', sans-serif;
    font-weight:700;
    
`

const ContainerBotao = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;