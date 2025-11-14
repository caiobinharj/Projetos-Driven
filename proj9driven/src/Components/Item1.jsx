import styled from "styled-components";

export default function Item1(props) {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick(props.num);
        }
    };

    return (
        <StyledItem1>
            <p>Pergunta {props.num + 1}</p>
            <img
                src="/seta_play.png"
                alt="setaplay"
                onClick={handleClick}
            />
        </StyledItem1>
    );
}

const StyledItem1 = styled.li`
    background-color: white;
    width: 300px;
    height: 65px;
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 375px) {
        width: 80vw;
    }
    

    img {
        margin-right: 15px;
        cursor: pointer;
    }
    p{
        margin-left:17px;
        font-family: 'Recursive', monospace;
        font-size:16px;
        font-weight:700;
    }
`;