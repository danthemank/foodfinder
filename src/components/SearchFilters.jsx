import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/slices/restaurantSlice';

const FiltersContainer = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
`;

const FilterGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SearchFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.restaurants.filters);

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
  };

  return (
    <FiltersContainer>
      <FilterGroup>
        <Label>Cuisine Type</Label>
        <Select
          value={filters.cuisine}
          onChange={(e) => handleFilterChange('cuisine', e.target.value)}
        >
          <option value="">All Cuisines</option>
          <option value="italian">Italian</option>
          <option value="chinese">Chinese</option>
          <option value="mexican">Mexican</option>
          <option value="indian">Indian</option>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Label>Price Range</Label>
        <Select
          value={filters.price}
          onChange={(e) => handleFilterChange('price', e.target.value)}
        >
          <option value="">Any Price</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Label>Distance (meters)</Label>
        <Select
          value={filters.radius}
          onChange={(e) => handleFilterChange('radius', e.target.value)}
        >
          <option value="1000">1km</option>
          <option value="2000">2km</option>
          <option value="5000">5km</option>
          <option value="10000">10km</option>
        </Select>
      </FilterGroup>
    </FiltersContainer>
  );
};

export default SearchFilters;
