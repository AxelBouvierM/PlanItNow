import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import rambla from '../images/rambla6.jpg'
import { NavBar } from '../components/header/NavBar'
import { SearchBar } from '../components/body/searchBar/SearchBar'
import { Footer } from '../components/footer/Footer';
import { Slides } from '../components/body/carousel/HomeSlides';
import { Categorias } from '../components/body/searchBar/SearchCategories'

const TopSectionContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
`;

const Background = styled.div`
  display: flex;
  position: relative;
  background-image: url(${rambla});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
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
  margin-top: 2em;
  justify-content: center;
`;

const Phrase = styled.p`
  	margin-top: 1em;
  	color: white;
  	font-size: 1.3em;
  	text-transform: uppercase;
    text-align: center;
    font-weight: normal;
    font-family: 'Lexend', sans-serif;
    animation: neon 3s infinite;
    @media all and (max-width:400px) {
        & {
          font-size: 1em;
        }
      }
`;

const NavBarStyles = styled.div`
    display: flex;
    position: relative;
    top: 1%;
    z-index: 5;
    width: fit-content;
    margin-bottom: 2.5em;
`;
const searchBarStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1.5em',
  zIndex: '2',
};

function Inicio() {
  return (
    <>
      <Background>
        <TopSectionContainer>
            <Content>
              <NavBarStyles>
                <NavBar />
              </NavBarStyles>
              <PhraseContainer>
                <Phrase>- Dejá que Montevideo te guíe -</Phrase>
              </PhraseContainer>
              <div className='searchBar' style={searchBarStyles}>
                <SearchBar data={Categorias} />
              </div>
              <div>
                <Slides />
              </div>
            </Content>
        </TopSectionContainer>
      </Background>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Inicio;
