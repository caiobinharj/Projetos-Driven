import styled from "styled-components";

export default function BarraConclusao(props) {
    return(
        <Barrona>
            <Texto>{props.count}/8 CONCLUÍDOS</Texto>
        </Barrona>
    )
}

const Barrona = styled.div`
    background-color: #ffffff;
    width: 375px;
    height:70px;
    display:flex;
    align-items: center;
    justify-content: center;
    bottom:0;
    position:fixed;
    @media (max-width: 375px) {
        width: 100vw;
    }
`

const Texto = styled.p`
    font-family: 'Recursive', monospace;
    
        

    
`