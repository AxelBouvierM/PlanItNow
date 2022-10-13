import React from 'react'
import styled from 'styled-components'

import LandPageHeader from '../components/LandingPageHeader/LandPageHeader'

import montaña5 from '../images/montaña5.jpg'


const Background = styled.div`
  border: 1px solid #000; 
  background-image: url(${montaña5});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;

function Landpage() {

	// crear botones para login y register con un modulo link y outlet de react-router-dom
  return (
	<Background>
	  <LandPageHeader />
	</Background>
  )
}

export default Landpage