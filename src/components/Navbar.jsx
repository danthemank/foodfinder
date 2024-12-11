import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Nav = styled.nav`
  background-color: var(--primary);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <Nav>
      <Logo to="/">FoodFinder</Logo>
      <NavLinks>
        {isAuthenticated ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/logout">Logout</NavLink>
          </>
        ) : (
          <NavLink to="/auth">Login</NavLink>
        )}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
