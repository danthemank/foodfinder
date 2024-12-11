import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchFilters from '../components/SearchFilters';
import RestaurantCard from '../components/RestaurantCard';
import { searchRestaurants } from '../store/slices/restaurantSlice';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RestaurantList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LuckyButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const { list: restaurants, loading, filters } = useSelector(state => state.restaurants);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (location) {
      dispatch(searchRestaurants({ ...location, ...filters }));
    }
  }, [location, filters, dispatch]);

  const handleLuckyClick = () => {
    if (restaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      // TODO: Show modal with random restaurant
      alert(`Try this: ${restaurants[randomIndex].name}`);
    }
  };

  return (
    <HomeContainer>
      <h1>Find Your Next Meal</h1>
      <LuckyButton onClick={handleLuckyClick}>I'm Feeling Lucky!</LuckyButton>
      
      <SearchContainer>
        <SearchFilters />
        <RestaurantList>
          {loading ? (
            <p>Loading restaurants...</p>
          ) : (
            restaurants.map(restaurant => (
              <RestaurantCard 
                key={restaurant.place_id} 
                restaurant={restaurant} 
              />
            ))
          )}
        </RestaurantList>
      </SearchContainer>
    </HomeContainer>
  );
};

export default Home;
