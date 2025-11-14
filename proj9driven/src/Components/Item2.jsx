import styled from "styled-components";
export default function Item2(props){

    const handleClick = () => {
        if (props.onClick) {
            props.onClick(props.num);
        }
    };

    return(<StyledItem2>
        <p>{props.question}</p>
        <img src="/seta_virar.png" alt="" onClick={handleClick}/>

    </StyledItem2>)
}


const StyledItem2 = styled.li`
    background-color: #ffffd4;
    width: 300px;
    height:130px;
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom:15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 375px) {
        width: 80vw;
    }
    
    img{
        
        height:20px;
        width:30px;
        margin-bottom:8px;
        margin-left:250px;
        
    }

    p{
        margin-right:15px;
        margin-top:15px;
        font-family: 'Recursive', monospace;
        margin-left: 15px;
        font-size: 18px;
        font-weight: 400;
        
    }
`
