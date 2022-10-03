import './App.css';
import styled from 'styled-components';
import React from 'react';
import { NavBar } from './components/header/NavBar';
import { SearchBar } from './components/body/searchBar/SearchBar';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

function App() {
  return (
    <>
      <React.Fragment>
        <NavBar />
      </React.Fragment>
      <AppContainer>
        <SearchBar />
      </AppContainer>
    </>
  );
}

export default App;
