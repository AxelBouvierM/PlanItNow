import styled from 'styled-components';
import React from 'react';
import montaña2 from '../images/montaña2.jpg'
import CatSlides from '../components/CategoriesSlider/CatSlides';
import { Parallax } from 'react-parallax';

const Background = styled.div`
  border: 1px solid #000; 
  background-image: url(${montaña2});
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
  width: 200vw;
  height: 100vh;
`;

const bgStyles = {
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};

const TitleCat = styled.h1`
  position: relative;
  top: 100px;
  text-align: center;
  font-size: 50px;
  color: #a1a1a1;
  text-shadow: 0 0 8px black;
`;

function Categories() {
  return (
    <>
      <Parallax strength={500}>
        <Background className='customBg' bgImageStyle={bgStyles}>
          <img src={montaña2} alt='montaña2' />
        </Background>
        <div className='bgDimensions' style={{ height: '100vh' }}>
            <div>
              <TitleCat>Juegos</TitleCat>
              <CatSlides />
              <TitleCat>Cosas</TitleCat>
              <CatSlides />
            </div>
        </div>
      </Parallax>
    </>
  );
}

export default Categories;