import React from 'react'
import styled from 'styled-components'

import LandPageHeader from '../components/LandingPage/LandPageHeader'
import LandPageBody from '../components/LandingPage/LandPageBody1'
import LandPageBody2 from '../components/LandingPage/LandPageBody2'
import LandPageBody3 from '../components/LandingPage/LandPageBody3'
import LandPageBody4 from '../components/LandingPage/LandPageBody4'

import Footer from '../components/footer/Footer'
import landpageBg1 from '../images/landpageBg1.jpg'
import landpageBg2 from '../images/landpageBg2.jpg'
import landpageBg3 from '../images/landpageBg3.jpg'
import landpageBg4 from '../images/landpageBg4.jpg'
import landPageBg5 from '../images/landpageBg5.jpg'



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

const Bg1 = styled.img`
  display: flex;
  position: relative;
  width: 100vw;
  z-index: 1;
`;

const OfferContainer = styled.div`
  display: flex;
  position: relative;
  height: 30vh;
`;

const Bg2 = styled.img`
  display: flex;
  position: relative;
  width: 100%;
  z-index: 1;
`;

const HowToUseContainer = styled.div`
  display: flex;
  position: relative;
  height: 70vh;
`;

function Landpage() {

  return (
  <>
    <BgContainer>
      <Bg1 src={landpageBg1}/>
      <LandPageHeader />
      <LandPageBody />
    </BgContainer>
    <OfferContainer>
      <Bg2 src={landpageBg2}/>
      <LandPageBody2 />
    </OfferContainer>
    <BgContainer>
      <Bg1 src={landpageBg3} />
      <LandPageBody3 />
    </BgContainer>
    <HowToUseContainer>
      <Bg2 src={landpageBg4} />
      <LandPageBody4 />
    </HowToUseContainer>
    <HowToUseContainer>
        <Bg2 src={landPageBg5} />
    </HowToUseContainer>
  <Footer />
  </>
  )
}

export default Landpage
