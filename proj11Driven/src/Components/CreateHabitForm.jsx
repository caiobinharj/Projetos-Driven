import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';
import { AuthContext } from '../Contexts/AuthContext';

const CreateHabitFormContainer = styled.div`
    width: 100%;
    background: #ffffff;
    border-radius: 5px;
    padding: 18px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 100%;
    height: 45px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    padding: 0 11px;
    margin-bottom: 8px;
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

const DayButtonsContainer = styled.div`
    display: flex;
    gap: 4px;
    margin-bottom: 29px;
`;

const DayButton = styled.button`
    width: 30px;
    height: 30px;
    background: ${props => (props.selected ? '#cfcfcf' : '#ffffff')};
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    line-height: 25px;
    color: ${props => (props.selected ? '#ffffff' : '#dbdbdb')};
    cursor: pointer;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;

const CancelButton = styled.button`
    width: 84px;
    height: 35px;
    background: #ffffff;
    border-radius: 4.63636px;
    border: none;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #52b6ff;
    cursor: pointer;
`;

const SaveButton = styled.button`
    width: 84px;
    height: 35px;
    background: #52b6ff;
    border-radius: 4.63636px;
    border: none;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${props => (props.disabled ? 0.7 : 1)};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

function CreateHabitForm({ onCancel, onSaveSuccess, initialName = '', initialDays = [] }) {
    const [name, setName] = useState(initialName);
    const [days, setDays] = useState(initialDays);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    const toggleDay = dayIndex => {
        if (loading) return;
        if (days.includes(dayIndex)) {
            setDays(days.filter(d => d !== dayIndex));
        } else {
            setDays([...days, dayIndex].sort((a, b) => a - b));
        }
    };

    const handleSave = async () => {
        if (name.trim() === '' || days.length === 0) {
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',
                { name, days },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            setName('');
            setDays([]);
            onSaveSuccess();
        } catch (error) {
            alert(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CreateHabitFormContainer>
            <Input
                type="text"
                placeholder="nome do hábito"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading}
            />
            <DayButtonsContainer>
                {weekDays.map((day, index) => (
                    <DayButton
                        key={index}
                        selected={days.includes(index)}
                        onClick={() => toggleDay(index)}
                        disabled={loading}
                    >
                        {day}
                    </DayButton>
                ))}
            </DayButtonsContainer>
            <Actions>
                <CancelButton onClick={onCancel} disabled={loading}>
                    Cancelar
                </CancelButton>
                <SaveButton onClick={handleSave} disabled={loading}>
                    {loading ? <ThreeDots color="#FFFFFF" height={40} width={40} /> : 'Salvar'}
                </SaveButton>
            </Actions>
        </CreateHabitFormContainer>
    );
}

export default CreateHabitForm;