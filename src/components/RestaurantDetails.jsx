import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ReviewList from './ReviewList';
import AddReview from './AddReview';

const DetailsContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const Header = styled.div`
  padding: 2rem;
  background: var(--primary);
  color: white;
`;

const Content = styled.div`
  padding: 2rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  h4 {
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Photo = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
`;

const RestaurantDetails = ({ restaurant }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const [showAddReview, setShowAddReview] = useState(false);

  const {
    name,
    rating,
    formatted_address,
    formatted_phone_number,
    opening_hours,
    photos,
    price_level,
    place_id
  } = restaurant;

  return (
    <DetailsContainer>
      <Header>
        <h2>{name}</h2>
        <div>{'★'.repeat(Math.round(rating))} ({rating})</div>
      </Header>

      <Content>
        <InfoGrid>
          <InfoItem>
            <h4>Address</h4>
            <p>{formatted_address}</p>
          </InfoItem>
          <InfoItem>
            <h4>Phone</h4>
            <p>{formatted_phone_number}</p>
          </InfoItem>
          <InfoItem>
            <h4>Price Level</h4>
            <p>{'$'.repeat(price_level)}</p>
          </InfoItem>
          <InfoItem>
            <h4>Hours</h4>
            <ul>
              {opening_hours?.weekday_text?.map((day, index) => (
                <li key={index}>{day}</li>
              ))}
            </ul>
          </InfoItem>
        </InfoGrid>

        {photos && (
          <PhotoGrid>
            {photos.map((photo, index) => (
              <Photo 
                key={index}
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${process.env.GOOGLE_PLACES_API_KEY}`}
                alt={`${name} photo ${index + 1}`}
              />
            ))}
          </PhotoGrid>
        )}

        <ReviewList restaurantId={place_id} />
        
        {isAuthenticated && (
          <>
            {showAddReview ? (
              <AddReview 
                restaurantId={place_id} 
                onClose={() => setShowAddReview(false)}
              />
            ) : (
              <button onClick={() => setShowAddReview(true)}>
                Write a Review
              </button>
            )}
          </>
        )}
      </Content>
    </DetailsContainer>
  );
};

export default RestaurantDetails;
