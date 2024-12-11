import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const Main = styled.main`
  min-height: 100vh;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
