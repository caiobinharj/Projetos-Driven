import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from './Contexts/AuthContext';
import { ProgressContext } from './Contexts/ProgressContext';

import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import HabitsPage from './Pages/HabitsPage';
import TodayPage from './Pages/TodayPage';

function App() {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('trackitUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (user) {
            localStorage.setItem('trackitUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('trackitUser');
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <ProgressContext.Provider value={{ progress, setProgress }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/cadastro" element={<SignupPage />} />
                        <Route path="/habitos" element={<HabitsPage />} />
                        <Route path="/hoje" element={<TodayPage />} />
                    </Routes>
                </BrowserRouter>
            </ProgressContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;