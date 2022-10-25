import React from 'react';
import styled from 'styled-components';
import cafe from '../../images/cafe.jpg';

const BodyContainer = styled.div`
  	display: block;
  	position: absolute;
  	width: 100vw;
	top: 50%;
	padding: 0 5em;
    transform: translateY(-50%);
	z-index: 3;
	@media all and (max-width:600px) {
    	& {
			padding: 0 1em;
    	}
  	}
`;

const Image = styled.img`
	display: inline-block;
	position: relative;
	height: 80vh;
	color: white;
	border: none;
	border-top: solid 5px #7e4894;
	text-align: center;
	@media all and (min-width:1151px) and (max-width:1280px) {
    	& {
			width: 70%;
			height: 70vh;
			margin: auto;
		}
  	}
	@media all and (min-width:900px) and (max-width: 1150px) {
    	& {
			width: 70%;
			height: 60vh;
			margin: auto;
		}
  	}
	@media all and (min-width:601px) and (max-width: 899px) {
    	& {
			width: 70%;
			height: 60vh;
			margin: auto;
		}
  	}
	@media all and (max-width:600px) {
    	& {
			width: 90%;
			height: 50vh;
			margin: auto;
    	}
  	}
`;

const ContentContainer = styled.div`
	display: inline-block;
	position: relative;
	width: fit-content;
	color: white;
  	font-size: 2em;
	font-weight: 350;
	margin: 0 0.5em;
	@media all and (max-width:900px) {
    	& {
			display: block;
			width: 100%;
			height: 70vh;
			margin: auto;
			text-align: center;

    	}
  	}
`;

const Phrase = styled.p`
	display: inline-block;
	position: absolute;
	width: 100%;
	color: white;
  	font-size: 1.5em;
	font-weight: 500;
	margin: 0 0.5em;
	top: 0;
	@media all and (min-width:900px) and (max-width:1280px) {
    	& {
			font-size: 1.3em;
		}
  	}
	@media all and (min-width:601px) and (max-width: 899px) {
    	& {
			width: 70%;
			height: 60vh;
			margin: auto;
		}
  	}
	@media all and (max-width:600px) {
    	& {
			display: flex;
			position: relative;
			margin: auto;
			width: 100%;
			top: 0;
			font-size: 0.5em;
    	}
  	}
`;

const Phrase2 = styled.p`
	display: inline-block;
	position: absolute;
	width: 20em;
	margin: 0 1em;
	padding-top: 1em;
	color: white;
  	font-size: 1em;
	font-weight: 350;
	top: 10%;
	font-style: italic;
	@media all and (min-width:1151px) and (max-width:1280px) {
    	& {
			width: 16.5em;
			padding-top: 0.2em;
			font-size: 1.2em;
		}
  	}
	@media all and (min-width:900px) and (max-width:1150px) {
    	& {
			width: 13em;
			padding-top: 0.2em;
			font-size: 1em;
		}
  	}
	@media all and (max-width:600px) {
    	& {
			display: flex;
			position: relative;
			margin: auto;
			width: 100%;
			top: 0;
			font-size: 0.5em;
    	}
  	}
`;

const Phrase3 = styled.p`
	display: inline-block;
	position: absolute;
	width: 20em;
	margin: 0 1em;
	padding-top: 1em;
	color: white;
  	font-size: 1em;
	font-weight: 350;
	top: 25%;
	font-style: italic;
	@media all and (min-width:1151px) and (max-width:1280px) {
    	& {
			width: 16.5em;
			padding-top: 0.2em;
			font-size: 1.2em;
		}
  	}
	@media all and (min-width:900px) and (max-width:1150px) {
    	& {
			width: 13em;
			padding-top: 0.2em;
			font-size: 1em;
		}
  	}
	@media all and (max-width:600px) {
    	& {
			display: flex;
			position: relative;
			margin: auto;
			width: 100%;
			top: 0;
			font-size: 0.5em;
    	}
  	}
`;

function LandPageBody() {
  return (
	<>
		<BodyContainer>
			<ContentContainer>
				<Image src={cafe} alt='coffee'/>
				<Phrase>Nuestro origen</Phrase>
				  <Phrase2>PIN! Surge como nexo entre el usuario y las distintas actividades que ofrece Montevideo. </Phrase2>
				  <Phrase3>Debido a la insuficiente difusión de eventos, espacios de entretenimiento y ofertas gastronómicas, decidimos diseñar una aplicación que reúna la mayor información posible, permitiendo así al usuario encontrar en un solo lugar una amplia variedad de opciones.</Phrase3>
			</ContentContainer>
		</BodyContainer>
	</>
  )
}

	
export default LandPageBody
