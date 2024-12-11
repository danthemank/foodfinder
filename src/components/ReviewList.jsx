import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchReviews } from '../store/slices/reviewsSlice';

const ReviewsContainer = styled.div`
  margin-top: 2rem;
`;

const ReviewCard = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const UserName = styled.span`
  font-weight: bold;
  color: var(--primary);
`;

const Rating = styled.span`
  color: #ffd700;
`;

const Date = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const ReviewList = ({ restaurantId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews.items[restaurantId] || []);

  useEffect(() => {
    dispatch(fetchReviews(restaurantId));
  }, [restaurantId, dispatch]);

  return (
    <ReviewsContainer>
      <h3>Reviews</h3>
      {reviews.map((review, index) => (
        <ReviewCard key={index}>
          <ReviewHeader>
            <UserName>{review.user.name}</UserName>
            <Rating>{'★'.repeat(review.rating)}</Rating>
          </ReviewHeader>
          <p>{review.text}</p>
          <Date>{new Date(review.date).toLocaleDateString()}</Date>
        </ReviewCard>
      ))}
    </ReviewsContainer>
  );
};

export default ReviewList;
