import React from 'react';
import styled from 'styled-components';
import { IoCheckmarkSharp } from 'react-icons/io5';

const TodayHabitCardContainer = styled.div`
    width: 100%;
    background: #ffffff;
    border-radius: 5px;
    padding: 13px 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HabitInfo = styled.div`
`;

const HabitName = styled.h3`
    font-size: 20px;
    line-height: 25px;
    color: #666666;
    margin-bottom: 7px;
`;

const SequenceText = styled.p`
    font-size: 13px;
    line-height: 16px;
    color: #666666;
`;

const StyledCheckmarkIcon = styled.div`
    font-size: 35px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CheckButton = styled.button`
    width: 69px;
    height: 69px;
    background: ${props => (props.$done ? '#8fc549' : '#e7e7e7')};
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

function TodayHabitCard({ habit, onToggleCheck }) {
    const currentSequenceColor = habit.done ? '#8fc549' : '#666666';
    const highestSequenceColor = (habit.done && habit.currentSequence === habit.highestSequence && habit.currentSequence > 0)
        ? '#8fc549'
        : '#666666';

    return (
        <TodayHabitCardContainer>
            <HabitInfo>
                <HabitName>{habit.name}</HabitName>
                <SequenceText>
                    Sequência atual: <span style={{ color: currentSequenceColor }}>{habit.currentSequence} dias</span>
                </SequenceText>
                <SequenceText>
                    Seu recorde: <span style={{ color: highestSequenceColor }}>{habit.highestSequence} dias</span>
                </SequenceText>
            </HabitInfo>
            <CheckButton $done={habit.done} onClick={() => onToggleCheck(habit.id, habit.done)}>
                <StyledCheckmarkIcon>
                    <IoCheckmarkSharp />
                </StyledCheckmarkIcon>
            </CheckButton>
        </TodayHabitCardContainer>
    );
}

export default TodayHabitCard;