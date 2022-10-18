import React from 'react'
import styled from 'styled-components'

import LandPageHeader from '../components/LandingPage/LandPageHeader'
import LandPageBody from '../components/LandingPage/LandPageBody1'
import LandPageBody2 from '../components/LandingPage/LandPageBody2'
import Footer from '../components/footer/Footer'
import concierto2 from '../images/concierto100.jpg'
import teatro from '../images/teatro.jpg'
import cerveza from '../images/brewery100.jpg'
import entreFoto from '../images/entreFoto.jpg'

/*const Background = styled.div`
  background-image: url(${concierto2});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;*/
const BgContainer = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const FirstBackground = styled.img`
  display: flex;
  position: relative;
  width: 100vw;
  z-index: 1;
`;

const SeparatorContainer = styled.div`
  display: flex;
  position: relative;
`;

const SecondBgContainer = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 80vh;
`;
const SecondBackground = styled.img`
  display: flex;
  position: relative;
  width: 100%;
  z-index: 1;
`;

const ThirdBackground = styled.div`
  background-image: url(${teatro});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;

function Landpage() {

  return (
  <>
    <BgContainer>
    <FirstBackground src={concierto2}/>
      <LandPageHeader />
      <LandPageBody />
    </BgContainer>
    <SeparatorContainer>
      <SecondBackground src={entreFoto}/>
    </SeparatorContainer>
    <SecondBgContainer>
      <SecondBackground src={cerveza}/>
    </SecondBgContainer>
  <ThirdBackground>
  </ThirdBackground>
  <Footer />
  </>
  )
}

export default Landpage
