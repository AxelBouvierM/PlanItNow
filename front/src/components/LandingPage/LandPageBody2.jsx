import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import cafe from '../../images/cafe.jpg';

const BodyContainer = styled.div`
  	display: flex;
  	position: relative;
  	width: 100vw;
	padding: 0 5em;
	z-index: 3;
	align-items: center;
`;

const Image = styled.img`
	display: inline-block;
	position: relative;
	max-width: 50%;
	max-height: 85vh;
	color: white;
	border: none;
	border-top: solid 5px #fafafa;
	text-align: center;
	@media all and (max-width: 1280) {
		max-width: 20%;
		max-height: 50vh;
	}
`;

const ContentContainer = styled.div`
	display: flex;
	position: relative;
	width: fit-content;
	color: white;
  	font-size: 2em;
	margin: 0 0.5em;
`;

const Texto = styled.div`
	display: inline-block;
	position: relative;
	max-height: 85vh;
	color: white;
  	font-size: 1.5em;
	padding: 0 0.5em;
	margin: auto;
	overflow-y: auto;
	overflow-x: hidden;
`;

const Phrase = styled(motion.p)`
	display: flex;
	position: relative;
	color: white;
  	font-size: 1em;
	top: 0;
	font-family: 'kanit', sans-serif;
`;

const Phrase2 = styled(motion.p)`
	display: flex;
	position: relative;
	color: white;
	margin: 1em 0 0.5em;
  	font-size: 0.7em;
	font-weight: 300;
	font-family: 'Barlow', sans-serif;
`;

const Phrase3 = styled(motion.p)`
	display: flex;
	position: relative;
	color: white;
  	font-size: 0.7em;
	font-weight: 300;
	font-family: 'Barlow', sans-serif;
`;

function LandPageBody2() {
  return (
	<>
		<BodyContainer>
			<ContentContainer>
				<Image src={cafe} alt='coffee'/>
				<Texto>
					<Phrase
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{
							ease: "easeInOut",
							duration: 1.5,
							delay: 0.4,
						}}
						viewport={{ once: true }}>Nuestro origen</Phrase>
					<Phrase2
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{
							ease: "easeInOut",
							duration: 1.5,
							delay: 0.4,
						}} 
						viewport={{ once: true }}>PIN! Surge como nexo entre el usuario y las distintas actividades que ofrece Montevideo. </Phrase2>
					<Phrase3
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{
							ease: "easeInOut",
							duration: 1.5,
							delay: 0.4,
						}}
						viewport={{ once: true }}>Debido a la insuficiente difusión de eventos, espacios de entretenimiento y ofertas gastronómicas, decidimos diseñar una aplicación que reúna la mayor información posible, permitiendo así al usuario encontrar en un solo lugar una amplia variedad de opciones.</Phrase3>
				</Texto>
			</ContentContainer>
		</BodyContainer>
	</>
  )
}
	
export default LandPageBody2
