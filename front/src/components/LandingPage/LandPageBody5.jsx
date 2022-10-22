import React from 'react';
import styled from 'styled-components';

const BodyContainer = styled.div`
  	display: block;
  	position: absolute;
  	width: 100vw;
	top: 43%;
    transform: translateY(-50%);
	z-index: 3;
	text-align: center;
	@media all and (max-width:600px) {
    	& {
			padding: 0 1em;
    	}
  	}
`;

const Phrase = styled.div`
	display: inline-block;
	width: fit-content;
	color: white;
	margin-right: 2em;
  	font-size: 3em;
	font-weight: 500;
`;

function LandPageBody() {
  return (
	<>
		<BodyContainer>
			<Phrase>Nuestro equipo</Phrase>
		</BodyContainer>
	</>
  )
}

	
export default LandPageBody