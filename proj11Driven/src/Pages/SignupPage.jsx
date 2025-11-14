import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';
import logo from './Logo.png'

const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 0 36px;
    background-color: #f2f2f2;

    img {
        width: 180px;
        margin-bottom: 32px;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 300px;
    }
`;

const Input = styled.input`
    width: 100%;
    height: 45px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    padding: 0 11px;
    margin-bottom: 6px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    line-height: 25px;
    color: #666666;

    &::placeholder {
        color: #dbdbdb;
    }

    &:disabled {
        background: #f2f2f2;
        color: #afafaf;
    }
`;

const Button = styled.button`
    width: 100%;
    height: 45px;
    background: #52b6ff;
    border-radius: 4.63636px;
    border: none;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 21px;
    line-height: 26px;
    text-align: center;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${props => (props.disabled ? 0.7 : 1)};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const StyledLink = styled(Link)`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52b6ff;
    margin-top: 25px;
`;

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(
                'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up',
                { email, name, image, password }
            );
            navigate('/');
        } catch (error) {
            alert('Erro ao cadastrar: ' + error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <AuthContainer>
            <img src={logo} alt="TrackIt Logo" />
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                    required
                />
                <Input
                    type="password"
                    placeholder="senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                    required
                />
                <Input
                    type="text"
                    placeholder="nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={loading}
                    required
                />
                <Input
                    type="url"
                    placeholder="foto"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    disabled={loading}
                    required
                />
                <Button type="submit" disabled={loading}>
                    {loading ? <ThreeDots color="#FFFFFF" height={40} width={40} /> : 'Cadastrar'}
                </Button>
            </form>
            <StyledLink to="/">Já tem uma conta? Faça login!</StyledLink>
        </AuthContainer>
    );
}

export default SignupPage;