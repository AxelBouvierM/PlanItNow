import './App.css';
import styled from 'styled-components';
import React from 'react';
import { NavBar } from './components/navBar';
import { SearchBar } from './components/searchBar';


const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

function App() {
  return (
    <div>
      <React.Fragment>
        <NavBar/>
      </React.Fragment>
      <AppContainer>
        <SearchBar />
      </AppContainer>
    </div>
  );
}

export default App;
