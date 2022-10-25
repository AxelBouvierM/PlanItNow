import { React, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { NavBar } from '../components/header/NavBar'
import Slides from '../components/body/carousel/CatSlides';

import rambla from '../images/rambla6.jpg'
import { Footer } from '../components/footer/Footer';

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
  margin-top: 8em;
  justify-content: center;
`;

const Phrase = styled.p`
  margin-top: 1em;
	color: white;
  font-size: 1.4em;
  font-family: 'Lexend', sans-serif;
  animation: neon 3s infinite;
`;

const navBarStyles = {
  position: 'relative',
  display: 'flex',
  top: '1%',
  zIndex: '5',
	width: 'fit-content'

};

function Categories() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/login/check')
      .then((res) => {
        if (res.data.response.status === 'User not logged in') navigate('/ingresar');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate])

  return (
    <>
      <TopSectionContainer>
        <Background>
          <Content>
            <div className='navBar' style={navBarStyles}>
              <NavBar />
            </div>
            <PhraseContainer>
              <Phrase>- Conocé más sobre tu ciudad -</Phrase>
            </PhraseContainer>
            <div>
              <Slides style={{}}/>
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

export default Categories;
