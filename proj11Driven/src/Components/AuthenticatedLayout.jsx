import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from './TopBar';
import Menu from './Menu';
import { AuthContext } from '../Contexts/AuthContext';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f2f2f2;
    padding-top: 70px;
    padding-bottom: 100px;
`;

const Content = styled.div`
    flex-grow: 1;
    padding: 28px 18px;
`;

function AuthenticatedLayout({ children }) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    return (
        <PageContainer>
            <TopBar />
            <Content>{children}</Content>
            <Menu />
        </PageContainer>
    );
}

export default AuthenticatedLayout;