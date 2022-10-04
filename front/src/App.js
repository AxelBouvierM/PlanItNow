import './App.css';
import React from 'react';
import { Parallax, Background } from 'react-parallax'
import { NavBar } from './components/header/NavBar';
import { SearchBar } from './components/body/searchBar/SearchBar';

const searchBarStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1.5rem',
  zIndex: '2'
};

const navBarStyles = {
  zIndex: '3'
};

function App() {
  return (
    <>
      <div style={navBarStyles}>
        <React.Fragment>
          <NavBar />
        </React.Fragment>
      </div>
      <div style={searchBarStyles}>
        <SearchBar />
      </div>
      <Parallax strength={500}>
        <Background className="Image1">
          <img src='./images/montaña1.jpg' alt='montaña'/>
        </Background>
      </Parallax>
    </>
  );
}

export default App;
