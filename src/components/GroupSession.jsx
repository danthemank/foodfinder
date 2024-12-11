import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { createSession, joinSession } from '../store/slices/groupSessionSlice';

const SessionContainer = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Button = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 1rem;
`;

const ParticipantList = styled.div`
  margin-top: 1rem;
`;

const GroupSession = () => {
  const dispatch = useDispatch();
  const [sessionInput, setSessionInput] = useState('');
  const { sessionId, participants } = useSelector(state => state.groupSession);

  const handleCreateSession = () => {
    dispatch(createSession());
  };

  const handleJoinSession = () => {
    if (sessionInput) {
      dispatch(joinSession(sessionInput));
    }
  };

  return (
    <SessionContainer>
      <h2>Group Decision</h2>
      
      {!sessionId ? (
        <div>
          <Button onClick={handleCreateSession}>Create New Session</Button>
          <Input
            type="text"
            placeholder="Enter session ID"
            value={sessionInput}
            onChange={(e) => setSessionInput(e.target.value)}
          />
          <Button onClick={handleJoinSession}>Join Session</Button>
        </div>
      ) : (
        <div>
          <p>Session ID: {sessionId}</p>
          <ParticipantList>
            <h3>Participants:</h3>
            {participants.map(participant => (
              <div key={participant.id}>{participant.name}</div>
            ))}
          </ParticipantList>
        </div>
      )}
    </SessionContainer>
  );
};

export default GroupSession;
