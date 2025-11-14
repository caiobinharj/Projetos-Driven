import styled from "styled-components";

export default function Item3(props){
    const handleClick = (status) => {
        if (props.onClick) {
            props.onClick(status);
        }
    };

    return(
        <StyledItem3>
            <Texto2>{props.answer}</Texto2>
            <Botoes>
                <Botao1 onClick={() => handleClick('erro')}>
                    <Texto1>Não lembrei</Texto1>
                </Botao1>
                <Botao2 onClick={() => handleClick('quase')}>
                    <Texto1>Quase não lembrei</Texto1>
                </Botao2>
                <Botao3 onClick={() => handleClick('acerto')}>
                    <Texto1>Zap!</Texto1>
                </Botao3>
            </Botoes>
        </StyledItem3>
    );
}


const StyledItem3 = styled.li`
    background-color: #ffffd4;
    width: 300px;
    height:130px;
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom:15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    @media (max-width: 375px) {
        width: 80vw;
    }
    
    
    img{
        margin-right:15px;
    }
`
const Botoes = styled.div`
    width:280px;
    display:flex;
    justify-content: space-around;
`

const Botao1=styled.button`
    background-color: #ff3030;
    width:85px;
    height:37px;
    border-radius: 5px;
`

const Botao2=styled.button`
    background-color: #ff922e;
    width:85px;
    height:37px;
    border-radius: 5px;

`

const Botao3=styled.button`
    background-color: #2fbe34;
    width:85px;
    height:37px;
    border-radius: 5px;
`

const Texto1=styled.p`
    color:white;
    font-size:12px;
    font-family: 'Recursive', monospace;

`

const Texto2=styled.p`
    font-size:18px;
    font-weight: 400;
    font-family: 'Recursive', monospace;
    margin-left:15px;
`
