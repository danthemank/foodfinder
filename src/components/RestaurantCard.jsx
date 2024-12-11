import React, { useState } from 'react';
import styled from 'styled-components';
import RestaurantDetails from './RestaurantDetails';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const RestaurantName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: var(--primary);
`;

const Rating = styled.div`
  color: #ffd700;
  margin-bottom: 0.5rem;
`;

const Address = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
`;

const RestaurantCard = ({ restaurant }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card onClick={() => setShowDetails(true)}>
        <RestaurantName>{restaurant.name}</RestaurantName>
        <Rating>{'★'.repeat(Math.round(restaurant.rating))} ({restaurant.rating})</Rating>
        <Address>{restaurant.vicinity}</Address>
      </Card>

      {showDetails && (
        <Modal onClick={() => setShowDetails(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <RestaurantDetails restaurant={restaurant} />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default RestaurantCard;
