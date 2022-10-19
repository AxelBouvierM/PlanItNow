import React from 'react';
import styled from 'styled-components';

const BodyContainer = styled.div`
  	display: block;
  	position: absolute;
  	width: 100vw;
  	justify-content: center;
	top: 50%;
    transform: translateY(-50%);
	padding: 0 5em;
	z-index: 3;
	@media all and (max-width:600px) {
    	& {
			padding: 0 1em;
    	}
  	}
`;

const Phrase = styled.p`
	color: white;
  	font-size: 3em;
	margin-bottom: 0.5em;
	@media all and (max-width:600px) {
    	& {
			text-align: center;
			display: block;
     		font-size: 1.6em;
			margin: auto;
			padding: 0.5em;
    	}
  	}
`;


function LandPageBody() {
  return (
	<>
		<BodyContainer>
			<Phrase>¿Querés conocer nuevos eventos?</Phrase>
			<Phrase>Únete ahora!</Phrase>
		</BodyContainer>
	</>
  )
}

	
export default LandPageBody
