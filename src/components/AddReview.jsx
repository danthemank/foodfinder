import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addReview } from '../store/slices/reviewsSlice';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
`;

const RatingInput = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.selected ? '#ffd700' : '#ddd'};
  cursor: pointer;
  
  &:hover {
    color: #ffd700;
  }
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
`;

const Button = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const AddReview = ({ restaurantId, onClose }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview({
      restaurantId,
      review: { rating, text }
    }));
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4>Write a Review</h4>
      
      <RatingInput>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarButton
            key={star}
            type="button"
            selected={star <= rating}
            onClick={() => setRating(star)}
          >
            ★
          </StarButton>
        ))}
      </RatingInput>

      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your experience..."
        required
      />

      <div>
        <Button type="submit">Submit Review</Button>
        <Button type="button" onClick={onClose}>Cancel</Button>
      </div>
    </Form>
  );
};

export default AddReview;
