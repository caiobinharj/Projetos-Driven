import React from 'react';
import styled from 'styled-components';
import { IoTrashOutline } from 'react-icons/io5';

const HabitCardContainer = styled.div`
    width: 100%;
    background: #ffffff;
    border-radius: 5px;
    padding: 13px 15px;
    margin-bottom: 10px;
    position: relative;
`;

const HabitName = styled.h3`
    font-size: 20px;
    line-height: 25px;
    color: #666666;
    margin-bottom: 8px;
`;

const DayButtonsDisplay = styled.div`
    display: flex;
    gap: 4px;
`;

const DayButtonDisplay = styled.div`
    width: 30px;
    height: 30px;
    background: ${props => (props.selected ? '#cfcfcf' : '#ffffff')};
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    line-height: 25px;
    color: ${props => (props.selected ? '#ffffff' : '#dbdbdb')};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledTrashIcon = styled.div`
    font-size: 20px;
    color: #666666;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DeleteIconWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

function HabitCard({ habit, onDelete }) {
    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    return (
        <HabitCardContainer>
            <HabitName>{habit.name}</HabitName>
            <DayButtonsDisplay>
                {weekDays.map((day, index) => (
                    <DayButtonDisplay
                        key={index}
                        selected={habit.days.includes(index)}
                    >
                        {day}
                    </DayButtonDisplay>
                ))}
            </DayButtonsDisplay>
            <DeleteIconWrapper onClick={() => onDelete(habit.id)}>
                <StyledTrashIcon>
                    <IoTrashOutline />
                </StyledTrashIcon>
            </DeleteIconWrapper>
        </HabitCardContainer>
    );
}

export default HabitCard;