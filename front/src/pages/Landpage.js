import React from 'react'
import styled from 'styled-components'

import LandPageHeader from '../components/LandingPage/LandPageHeader'
import LandPageBody from '../components/LandingPage/LandPageBody'
import Footer from '../components/footer/Footer'
import montaña5 from '../images/montaña5.jpg'


const Background = styled.div`
  background-image: url(${montaña5});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;

function Landpage() {

  return (
	<Background>
	  <LandPageHeader />
    <LandPageBody/>
    <Footer />
	</Background>
  )
}

export default Landpage
