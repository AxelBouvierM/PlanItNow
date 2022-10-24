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
  font-size: 1em;
`;

const navBarStyles = {
  position: 'relative',
  display: 'flex',
  top: '1%',
  zIndex: '5',
  width: 'fit-content'
};

const searchBarStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1.5em',
  zIndex: '2',
};

function Inicio() {
  const navigate = useNavigate();

  axios.get('/login/check')
    .then((res) => {
      if (res.data.response.status === 'User not logged in') navigate('/ingresar');
    })
    .catch((err) => {
      console.log(err);
    });

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
              <SearchBar data={Categorias} />
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
