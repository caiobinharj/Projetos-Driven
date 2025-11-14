import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import styled from 'styled-components';
import AuthenticatedLayout from '../Components/AuthenticatedLayout';
import TodayHabitCard from '../Components/TodayHabitCard';
import { AuthContext } from '../Contexts/AuthContext';
import { ProgressContext } from '../Contexts/ProgressContext';

dayjs.locale('pt-br');

const TodayPageContainer = styled.div`
`;

const HeaderContainer = styled.div`
    margin-bottom: 28px;

    h2 {
        font-size: 23px;
        line-height: 29px;
        color: #126ba5;
        margin-bottom: 7px;
    }
`;

const ProgressText = styled.p`
    font-size: 18px;
    line-height: 22px;
    color: ${props => (props.progress > 0 ? '#8fc549' : '#bababa')};
`;

function TodayPage() {
    const [todayHabits, setTodayHabits] = useState([]);
    const { user } = useContext(AuthContext);
    const { progress, setProgress } = useContext(ProgressContext);

    const calculateProgress = useCallback((habits) => {
        const totalHabits = habits.length;
        if (totalHabits === 0) {
            setProgress(0);
            return;
        }
        const completedHabits = habits.filter(habit => habit.done).length;
        const percentage = (completedHabits / totalHabits) * 100;
        setProgress(percentage);
    }, [setProgress]);

    const fetchTodayHabits = useCallback(async () => {
        try {
            const response = await axios.get(
                'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            setTodayHabits(response.data);
            calculateProgress(response.data);
        } catch (error) {
            console.error('Erro ao carregar hábitos de hoje:', error);
            alert('Erro ao carregar hábitos de hoje: ' + error.response.data.message);
        }
    }, [user, calculateProgress]);

    useEffect(() => {
        if (user) {
            fetchTodayHabits();
        }
    }, [user, fetchTodayHabits]);

    const handleToggleCheck = async (habitId, isDone) => {
        const endpoint = isDone ? 'uncheck' : 'check';
        try {
            await axios.post(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/${endpoint}`,
                {},
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            fetchTodayHabits();
        } catch (error) {
            console.error('Erro ao marcar/desmarcar hábito:', error);
            alert('Erro ao marcar/desmarcar hábito: ' + error.response.data.message);
        }
    };

    const today = dayjs().format('dddd, DD/MM');
    const displayToday = today.charAt(0).toUpperCase() + today.slice(1);

    return (
        <AuthenticatedLayout>
            <TodayPageContainer>
                <HeaderContainer>
                    <h2>{displayToday}</h2>
                    <ProgressText progress={progress}>
                        {progress > 0 ? `${Math.round(progress)}% dos hábitos concluídos` : 'Nenhum hábito concluído ainda'}
                    </ProgressText>
                </HeaderContainer>

                {todayHabits.length === 0 ? (
                    <p>Você não tem nenhum hábito para hoje. Adicione hábitos na tela de Hábitos!</p>
                ) : (
                    todayHabits.map(habit => (
                        <TodayHabitCard key={habit.id} habit={habit} onToggleCheck={handleToggleCheck} />
                    ))
                )}
            </TodayPageContainer>
        </AuthenticatedLayout>
    );
}

export default TodayPage;