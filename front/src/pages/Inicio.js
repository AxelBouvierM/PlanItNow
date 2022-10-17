import React from 'react'
import styled from 'styled-components';
import { Parallax } from 'react-parallax';


import { NavBar } from '../components/header/NavBar'
import { SearchBar } from '../components/body/searchBar/SearchBar'
import Slides from '../components/body/Carousel/Slides';

import rambla from '../images/rambla6.jpg'
import Footer from '../components/footer/Footer';
import { FaFileExcel } from 'react-icons/fa';


const TopSectionContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: block;
  position: relative;
`;

const Background = styled.div`
  display: flex;
  position: relative;
  background-image: url(${rambla});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
`;

const PhraseContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin-top: 1.5em;
  justify-content: center;
`;

const Phrase = styled.p`
  margin-top: 1em;
	color: white;
  font-size: 1.2em;
`;

const navBarStyles = {
  position: 'relative',
  display: 'flex',
  width: '100%',
  top: '1%',
  zIndex: '3'
};

const searchBarStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1.5em',
  zIndex: '2',
};

function Inicio() {
  // metodo get para chequear si el user esta logeado (endpoint /login/check), si no esta logeado redireccionar
  // a landpage
  return (
    <>
    <TopSectionContainer>
      <Background>
          <Content>
            <div className='navBar' style={navBarStyles}>
              <NavBar />
            </div>
            <PhraseContainer>
              <Phrase>- Dejá que Montevideo te guíe -</Phrase>
            </PhraseContainer>
            <div className='searchBar' style={searchBarStyles}>
              <SearchBar />
            </div>
            <div>
              <Slides />
            </div>
          </Content>
      </Background>
      <div>
        <Footer />
      </div>
    </TopSectionContainer>

    </>
  );
}

export default Inicio;

/* <Parallax strength={500}>
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
            <div>
              <Slides />
            </div>
          </div>
        </div>
      </Parallax> */
