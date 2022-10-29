import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import concert from '../../images/concert.jpg';

const BodyContainer = styled.div`
  	display: block;
  	position: relative;
  	width: 100vw;
	height: 100vh;
	padding: 0 5em;
	z-index: 3;
	align-items: center;
	justify-content: center;
`;

const Image = styled(motion.img)`
	display: block;
	position: relative;
	max-width: 50%;
	max-height: 85vh;
	color: white;
	border: none;
	border-top: 1px solid #fafafa;
	border-bottom: 1px solid #fafafa;	
 	margin: 0 auto;
	@media all and (max-width: 1280) {
		max-width: 20%;
		max-height: 50vh;
	}
`;

const ContentContainer = styled.div`
	display: block;
	position: relative;
	width: fit-content;
	color: white;
  	font-size: 2em;
`;

const Texto = styled.div`
	display: block;
	position: relative;
	width: 100%;
	max-height: 70vh;
	color: white;
  	font-size: 1.5em;
	padding: 0 0.5em;
	margin-top: 0.5em;
	overflow-y: auto;
	overflow-x: hidden;
	justify-content: center;
`;

const Phrase = styled(motion.p)`
	display: flex;
	position: relative;
	color: white;
	width: 100%;
  	font-size: 0.8em;
	top: 0;
	font-family: 'kanit', sans-serif;
	text-align: center;
`;

const Phrase2 = styled(motion.p)`
	display: flex;
	position: relative;
	color: white;
	width: fit-content;
	margin: 1em 0 0.5em;
  	font-size: 0.5em;
	font-weight: 300;
	font-family: 'Barlow', sans-serif;
	text-align: center;
`;

const Phrase3 = styled(motion.p)`
	display: flex;
	position: relative;
	color: white;
	width: 100%;
  	font-size: 0.5em;
	font-weight: 300;
	font-family: 'Barlow', sans-serif;
	text-align: center;
`;

function LandPageBody2() {
  return (
	<>
		<BodyContainer>
			<ContentContainer>
				<Image src={concert} alt='concert'
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{
						ease: "easeInOut",
						duration: 1.5,
						delay: 0.4,
					}}
					viewport={{ once: true }}
				/>
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
