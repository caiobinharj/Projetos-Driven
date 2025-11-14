import styled from "styled-components";

export default function Item4(props) {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick(props.num);
        }
    };

    const pegaCorIcone = () => {
        switch(props.status) {
            case 'erro':
                return { color: '#FF3030', icon: 'icone_erro.png' };
            case 'quase':
                return { color: '#FF922E', icon: 'icone_quase.png' };
            case 'acerto':
                return { color: '#2FBE34', icon: 'icone_certo.png' };
        }
    };

    const { color, icon } = pegaCorIcone();

    return (
        <StyledItem4 color={color}>
            <p style={{ color: color }}>Pergunta {props.num + 1}</p>
            <img
                src={icon}
                onClick={handleClick}
                alt="icone"
            />
        </StyledItem4>
    );
}

const StyledItem4 = styled.li`
    background-color: white;
    width: 300px;
    height: 65px;
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: line-through;
    
    @media (max-width: 375px) {
        width: 80vw;
    }
    
    text-decoration-color: ${props =>
    props.color === '#FF3030' ? '#FF3030' : props.color === '#FF922E' ? '#FF922E' : '#2FBE34'

};

    p {
        color: ${props => props.color || '#333333'};
        margin-left: 15px;
        font-family: 'Recursive', monospace;
        font-size:16px;
        font-weight:700;
        
    }

    img {
        margin-right: 15px;
        cursor: pointer;
    }
`;