import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { RiMapLine, RiPushpinLine, RiCalendarTodoLine } from 'react-icons/ri';
import testLogo from '../../images/pinLogoApp.png'
import landpageBg1 from '../../images/landpageBg1.jpg';
import landpageBg2 from '../../images/landpageBg2.jpg';

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

const HeaderContainer = styled(motion.header)`
	display: flex;
	position: absolute;
	width: 100vw;
	padding: 0 3em;
	top: 0;
	z-index: 3;
`;

const LogoContainer = styled.div`
	display: flex;
	position: relative;
  width: 50%;
`;

const Logo = styled.img`
	width: 7em;
	opacity: 1;
`;

const ButtonsContainer = styled.div`
  display: flex;
  position: relative;
  gap: 1em;
  width: 50%;
  flex-direction: row-reverse
`;

const BodyContainer = styled(motion.div)`
  	display: block;
  	position: absolute;
  	width: 100vw;
  	justify-content: center;
	top: 45%;
	padding: 0 5em;
	z-index: 3;
`;

const Phrase = styled.p`
	color: white;
  	font-size: 3em;
	font-family: 'kanit', sans-serif;
	margin-bottom: 0.5em;
`;

const Phrase2 = styled.p`
	color: white;
  	font-size: 3em;
  	font-family: 'lexend', sans-serif;
	margin-bottom: 0.5em;
	font-weight: 200;
`;

const LoginButton = styled.button`
  display:inline-block;
  padding:0.35em 2em;
  border:0.1em solid #FFFFFF;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;
  font-family: 'Lexend', sans-serif;
  color:#FFFFFF;
  text-align:center;
  transition: all 0.2s;
  background-color: transparent;
  font-size: 1em;
  margin: 0 2em;
  cursor: pointer;
  &:hover {
    color:#000000;
    background-color: #fafafa;
  }
`;

const RegisterButton = styled(motion.button)`
  display:inline-block;
  padding:0.35em 2em;
  border:0.1em solid #FFFFFF;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;
  font-family: 'Lexend', sans-serif;
  color:#FFFFFF;
  text-align:center;
  transition: all 0.2s;
  background-color: transparent;
  font-size: 1.1em;
  margin: 0 2em;
  cursor: pointer;
  &:hover {
    color:#000000;
    background-color: #fafafa;
  }
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

const Icon = styled.i`
  vertical-align: middle;
  margin: 0 0.4em;
`;

const Offer = styled.p`
	display: inline-block;
	width: fit-content;
	color: white;
  	font-size: 1.8em;
  	font-family: 'Barlow', sans-serif;
	margin: 0 0.5em;
	font-style: italic;
`;

function LandPageBody1() {
  return (
	<>
	<BgContainer>
	  <Bg1 src={landpageBg1} />
      <HeaderContainer 
      initial={{ opacity: 0, y: -90 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ease: "easeInOut",
        duration: 1,
        delay: 0.2,
      }}>
        <LogoContainer>
          <Logo src={testLogo} />
        </LogoContainer>
        <ButtonsContainer>
          <Link to="/ingresar">
            <LoginButton type="button">Iniciar sesión</LoginButton>
          </Link>
          <Outlet />
        </ButtonsContainer>
      </HeaderContainer>
		<BodyContainer
		  initial={{ opacity: 0, y: -180 }}
		  animate={{ opacity: 1, y: 0 }}
		  transition={{
			  ease: "easeInOut",
			  duration: 1.2,
			  delay: 0.5,
		  }}>
			<Phrase>¿Quieres conocer nuevos eventos?</Phrase>
			<Phrase2>Únete ahora!</Phrase2>
			<Link to="/registrarse">
			<RegisterButton type="button" 
				initial={{ opacity: 0, borderColor: 'transparent'}}
				animate={{ opacity: 1, borderColor: '#fafafa'}}
				transition={{
					ease: "easeInOut",
					duration: 2,
					delay: 1.2,
					repeat: 'Infinity',
				}}>Registrarse</RegisterButton>
			</Link>
			<Outlet/>
		</BodyContainer>
	</BgContainer>
	<OfferContainer>
	    <Bg2 src={landpageBg2}/>
		<BodyContainer>
			<Offer><Icon><RiMapLine /></Icon>Descubre lugares</Offer>
			<Offer><Icon><RiPushpinLine /></Icon>Elige tu evento</Offer>
			<Offer><Icon><RiCalendarTodoLine /></Icon>Agenda tu fecha</Offer>
		</BodyContainer>
	</OfferContainer>	
	</>
  )
}

	
export default LandPageBody1


/*	< Phrase > Nuestro origen</ >
				  <Phrase2>PIN! Surge como nexo entre el usuario y las distintas actividades que ofrece Montevideo. </Phrase2>
				  <Phrase3>Debido a la insuficiente difusión de eventos, espacios de entretenimiento y ofertas gastronómicas, decidimos diseñar una aplicación que reúna la mayor información posible, permitiendo así al usuario encontrar en un solo lugar una amplia variedad de opciones.</Phrase3>*/
