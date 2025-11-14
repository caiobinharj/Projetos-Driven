import { useState } from "react";
import styled from "styled-components";
import Item1 from "./Item1.jsx";
import Item2 from "./Item2.jsx";
import Item3 from "./Item3.jsx";
import Item4 from "./Item4.jsx";

export default function Perguntas(props) {
    const [cartas] = useState([
        { question: "O que é JSX?", answer: "Uma extensão da linguagem JavaScript" },
        { question: "O React é __", answer: "Uma biblioteca JavaScript para construção de interfaces" },
        { question: "Componentes devem iniciar com __", answer: "Letra maiúscula" },
        { question: "Podemos colocar __ dentro do JSX", answer: "expressões" },
        { question: "O ReactDOM nos ajuda __", answer: "Interagindo com a DOM para colocar componentes React na mesma" },
        { question: "Usamos o npm para __", answer: "Gerenciar os pacotes necessários e suas dependências" },
        { question: "Usamos props para __", answer: "Passar diferentes informações para componentes" },
        { question: "Usamos estado (state) para __", answer: "Dizer para o React quais informações quando atualizadas devem renderizar a tela novamente" }
    ]);
    const [niveisCarta, setNiveisCarta] = useState(Array(cartas.length).fill(1));
    const [statusCarta, setStatusCarta] = useState(Array(cartas.length).fill(null));

    function click(index, nivelAtual, status = null) {
        if (niveisCarta[index] === 4) return;

        const novosNiveis = [...niveisCarta];
        novosNiveis[index] = nivelAtual + 1;
        setNiveisCarta(novosNiveis);

        if (status) {
            const newStatus = [...statusCarta];
            newStatus[index] = status;
            setStatusCarta(newStatus);
        }

        if (nivelAtual === 3) {
            props.setCount(prevCount => prevCount + 1);
        }
    }

    const conteudoAtualizado = cartas.map((carta, i) => {
        const nivel = niveisCarta[i];
        const status = statusCarta[i];

        const commonProps = {
            question: carta.question,
            answer: carta.answer,
            num: i,
            key: `item${nivel}-${i}`,
            onClick: (status) => click(i, nivel, status),
            status: status
        };

        switch(nivel) {
            case 1:
                return <Item1 {...commonProps} />;
            case 2:
                return <Item2 {...commonProps} />;
            case 3:
                return <Item3 {...commonProps} />;
            case 4:
                return <Item4 {...commonProps} />;
        }
    });

    return (
        <Lista>
            {conteudoAtualizado}
        </Lista>
    );
}

const Lista = styled.ul`
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;