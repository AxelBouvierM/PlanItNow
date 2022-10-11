import React from 'react';
import { Parallax, Background } from 'react-parallax'
import { NavBar } from '../components/header/NavBar';
import { SearchBar } from '../components/body/searchBar/SearchBar';
import image1 from '../images/montaña1.jpg'

const searchBarStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '10rem',
  zIndex: '2'
};

const navBarStyles = {
  position: 'fixed',
  top: '1%',
  zIndex: '3'
};

const bgStyles = {
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};

function Inicio() {
  // metodo get para chequear si el user esta logeado (endpoint /login/check), si no esta logeado redireccionar
  // a landpage
  return (
    <>
      <Parallax strength={500}>
        <Background className='customBg' bgImageStyle={bgStyles}>
          <img src={image1} alt='montaña' />
        </Background>
        <div className='bgDimensions' style={{ height: '100vh' }}>
          <div className='content'>
            <div className='navBar' style={navBarStyles}>
              <NavBar />
            </div>
            <div className='searchBar' style={searchBarStyles}>
              <SearchBar />
            </div>
          </div>
        </div>
      </Parallax>
    </>
  );
}

export default Inicio;
