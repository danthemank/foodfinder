import React from 'react';
import styled from 'styled-components';
import UserPreferences from '../components/UserPreferences';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <h1>Your Profile</h1>
      <UserPreferences />
    </ProfileContainer>
  );
};

export default Profile;
