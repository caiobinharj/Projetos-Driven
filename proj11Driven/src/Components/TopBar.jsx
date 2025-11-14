import { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

const HeaderBar = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background: #126ba5;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    z-index: 1000;

    h1 {
        font-family: 'Playball', cursive;
        font-size: 39px;
        line-height: 49px;
        color: #ffffff;
        cursor: pointer; 
    }

    img {
        width: 51px;
        height: 51px;
        border-radius: 98.5206px;
        object-fit: cover;
    }
`;

function TopBar() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        setUser(null);
        localStorage.removeItem('trackitUser');
        navigate('/');
    };

    return (
        <HeaderBar>
            <h1 onClick={handleLogoClick}>TrackIt</h1>
            <img src={user?.image} alt="User Avatar" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/51x51/cccccc/333333?text=User"; }} />
        </HeaderBar>
    );
}

export default TopBar;