import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updatePreferences, savePreferences } from '../store/slices/userPreferencesSlice';

const PreferencesContainer = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  color: var(--primary);
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.5rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const SaveButton = styled.button`
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

const UserPreferences = () => {
  const dispatch = useDispatch();
  const preferences = useSelector(state => state.preferences);

  const handlePreferenceChange = (category, value) => {
    const currentValues = preferences[category];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    dispatch(updatePreferences({ [category]: updatedValues }));
  };

  const handleSave = () => {
    dispatch(savePreferences(preferences));
  };

  return (
    <PreferencesContainer>
      <Section>
        <Title>Dietary Restrictions</Title>
        <CheckboxGroup>
          {['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher'].map(option => (
            <Label key={option}>
              <input
                type="checkbox"
                checked={preferences.dietary.includes(option)}
                onChange={() => handlePreferenceChange('dietary', option)}
              />
              {option}
            </Label>
          ))}
        </CheckboxGroup>
      </Section>

      <Section>
        <Title>Favorite Cuisines</Title>
        <CheckboxGroup>
          {['Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese', 'Thai'].map(cuisine => (
            <Label key={cuisine}>
              <input
                type="checkbox"
                checked={preferences.favoriteCuisines.includes(cuisine)}
                onChange={() => handlePreferenceChange('favoriteCuisines', cuisine)}
              />
              {cuisine}
            </Label>
          ))}
        </CheckboxGroup>
      </Section>

      <Section>
        <Title>Price Range</Title>
        <CheckboxGroup>
          {['$', '$$', '$$$', '$$$$'].map(price => (
            <Label key={price}>
              <input
                type="checkbox"
                checked={preferences.priceRange.includes(price)}
                onChange={() => handlePreferenceChange('priceRange', price)}
              />
              {price}
            </Label>
          ))}
        </CheckboxGroup>
      </Section>

      <SaveButton onClick={handleSave}>Save Preferences</SaveButton>
    </PreferencesContainer>
  );
};

export default UserPreferences;
