import { useState } from 'react'
import './Styles/reset.css'
import styled from 'styled-components'
import Logo from "./Components/Logo.jsx";
import BarraConclusao from "./Components/BarraConclusao.jsx";
import Perguntas from "./Components/Perguntas.jsx";

export default function App() {

    const [count, setCount] = useState(0)
    return (
        <Bg>
            <ZapRecall>
                <Corpo>
                    <Logo/>
                    <Perguntas count={count} setCount={setCount} />
                </Corpo>
                <BarraConclusao count={count}/>
            </ZapRecall>
        </Bg>
    )
}

const ZapRecall = styled.div`
    background-color: #FB6B6B;
    width: 375px;
    height: 200vh;

    @media (max-width: 375px) {
        width: 100vw;
    }
`
const Corpo=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    
`

const Bg = styled.div`
background-color: lightgrey;
    height:205vh;
    display:flex;
    justify-content: center;    
`