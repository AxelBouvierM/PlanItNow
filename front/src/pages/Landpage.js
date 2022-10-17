import React from 'react'
import styled from 'styled-components'

import LandPageHeader from '../components/LandingPage/LandPageHeader'
import LandPageBody from '../components/LandingPage/LandPageBody'
import Footer from '../components/footer/Footer'
import concierto from '../images/concierto.jpg'
import cerveza from '../images/brewery.jpg'
import teatro from '../images/teatro.jpg'


const Background = styled.div`
  background-image: url(${concierto});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;
const SecondBackground = styled.div`
  background-image: url(${cerveza});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
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
	<Background>
	  <LandPageHeader />
    <LandPageBody/>
	</Background>
  <SecondBackground>
  </SecondBackground>
  <ThirdBackground>
  </ThirdBackground>
  <Footer />
  </>
  )
}

export default Landpage
