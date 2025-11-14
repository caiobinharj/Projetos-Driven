import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    body {
        font-family: 'Lexend Deca', sans-serif;
        background-color: #f2f2f2;
        margin: 0;
        padding: 0;
    }
`;

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GlobalStyles />
        <App />
    </React.StrictMode>,
);