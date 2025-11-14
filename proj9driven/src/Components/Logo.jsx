import styled from "styled-components";

export default function Logo(){
    return(
        <Titulo>
            <Imagem src="logo.png" alt="logo"/>
            <Texto>ZapRecall</Texto>
        </Titulo>
    )
}

const Titulo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:255.61px;
    height:61px;
    margin-top:30px;
    margin-bottom:30px;
    @media (max-width: 375px) {
        width: 66vw;
    }
`

const Texto = styled.p`
    margin-right:30px;
    font-family: 'Righteous', cursive;
    font-size: 36px; 
    font-weight: 400;
    color: white;
    @media (max-width: 375px) {
        font-size:30px;
    }

    @media (max-width: 250px) {
        font-size:24px;
    }
`

const Imagem = styled.img`
    width:52px;
    height:60px;
`