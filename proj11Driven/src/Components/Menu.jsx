import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { MdCalendarMonth, MdEventAvailable } from 'react-icons/md';

const FooterMenu = styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background: #ffffff;
    display: flex;
    align-items: center;
    z-index: 1000;
`;

const StyledIcon = styled.div`
    font-size: 24px;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const NavMenuItem = styled(Link)`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    text-decoration: none;

    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    background-color: ${props => props.$isactive ? '#52B6FF' : 'transparent'};
    color: ${props => props.$isactive ? '#FFFFFF' : '#52B6FF'};

    transition: background-color 0.2s, color 0.2s;
`;

function Menu() {
    const location = useLocation();

    const isHabitosActive = location.pathname === '/habitos';
    const isHojeActive = location.pathname === '/hoje';

    return (
        <FooterMenu>
            <NavMenuItem to="/habitos" $isactive={isHabitosActive}>
                <StyledIcon>
                    <MdCalendarMonth />
                </StyledIcon>
                Hábitos
            </NavMenuItem>

            <NavMenuItem to="/hoje" $isactive={isHojeActive}>
                <StyledIcon>
                    <MdEventAvailable />
                </StyledIcon>
                Hoje
            </NavMenuItem>
        </FooterMenu>
    );
}

export default Menu;