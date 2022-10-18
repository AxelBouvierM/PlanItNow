import styled from 'styled-components';
import React from 'react';
import montaña2 from '../images/montaña2.jpg'
import Slides from '../components/body/Carousel/Slides';
import { Parallax } from 'react-parallax';
import { NavBar } from '../components/header/NavBar'


const Background = styled.div`
  border: 1px solid #000; 
  background-image: url(${montaña2});
  background-position: center;
  background-repeat: repeat-y;
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;

const TitleCat = styled.h1`
  position: relative;
  top: 100px;
  text-align: center;
  font-size: 50px;
  color: #a1a1a1;
  text-shadow: 0 0 8px black;
`;

const Content = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
`;

const navBarStyles = {
  position: 'relative',
  display: 'flex',
  width: '100%',
  top: '1%',
  zIndex: '3'
};

function Categories() {

  return (
    <>
      <Parallax strength={500}>
        <Background>
          <Content>
            <div>
            <div className='navBar' style={navBarStyles}>
              <NavBar />
            </div>
              <TitleCat>Juegos</TitleCat>
              <Slides />

            </div>
            </Content>
        </Background>
      </Parallax>
    </>
  );
}

export default Categories;