import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AuthenticatedLayout from '../Components/AuthenticatedLayout';
import CreateHabitForm from '../Components/CreateHabitForm';
import HabitCard from '../Components/HabitCard';
import { AuthContext } from '../Contexts/AuthContext';

const HabitsPageContainer = styled.div`
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
        font-size: 23px;
        line-height: 29px;
        color: #126ba5;
    }
`;

const AddHabitButton = styled.button`
    width: 40px;
    height: 35px;
    background: #52b6ff;
    border-radius: 4.63636px;
    border: none;
    font-size: 27px;
    line-height: 34px;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
`;

const NoHabitsText = styled.p`
    font-size: 18px;
    line-height: 22px;
    color: #666666;
    margin-top: 28px;
`;

function HabitsPage() {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [habits, setHabits] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchHabits = useCallback(async () => {
        try {
            const response = await axios.get(
                'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            setHabits(response.data);
        } catch (error) {
            console.error('Erro ao carregar hábitos:', error);
            alert('Erro ao carregar hábitos: ' + error.response.data.message);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchHabits();
        }
    }, [user, fetchHabits]);

    const handleDeleteHabit = async (habitId) => {
        if (window.confirm("Deseja realmente excluir este hábito?")) {
            try {

                alert("Hábito excluído com sucesso (simulado, API não oferece DELETE).");

                setHabits(prevHabits => prevHabits.filter(h => h.id !== habitId));

            } catch (error) {
                console.error('Erro ao excluir hábito (simulado):', error);
                alert("Falha ao excluir hábito (simulado, API não oferece DELETE).");
            }
        }
    };

    return (
        <AuthenticatedLayout>
            <HabitsPageContainer>
                <Header>
                    <h2>Meus hábitos</h2>
                    <AddHabitButton onClick={() => setShowCreateForm(true)}>
                        +
                    </AddHabitButton>
                </Header>

                {showCreateForm && (
                    <CreateHabitForm
                        onCancel={() => setShowCreateForm(false)}
                        onSaveSuccess={() => {
                            setShowCreateForm(false);
                            fetchHabits();
                        }}
                    />
                )}

                {habits.length === 0 ? (
                    <NoHabitsText>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar!
                    </NoHabitsText>
                ) : (
                    habits.map(habit => (
                        <HabitCard key={habit.id} habit={habit} onDelete={handleDeleteHabit} />
                    ))
                )}
            </HabitsPageContainer>
        </AuthenticatedLayout>
    );
}

export default HabitsPage;