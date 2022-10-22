import React from 'react';
import styled from 'styled-components';

import { RiMapLine, RiPushpinLine, RiCalendarTodoLine } from 'react-icons/ri';

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

const Phrase = styled.p`
	display: inline-block;
	width: fit-content;
	color: white;
  	font-size: 2em;
	font-weight: 350;
	margin: 0 0.5em;
	font-style: italic;
	@media all and (max-width:1200px) and (min-width:801px) {
    	& {
			font-size: 1.8em;
			margin: auto;
			padding: 0.5em;
    	}
  	}
	@media all and (max-width:800px) and (min-width:601px) {
    	& {
			font-size: 1.3em;
			margin: auto;
			padding: 0.5em;
    	}
  	}
	@media all and (max-width:600px) {
    	& {
			display: block;
     		font-size: 1.5em;
			margin: auto;
			padding: 0.5em;
    	}
  	}
`;

const Icon = styled.i`
  vertical-align: middle;
  margin: 0 0.4em;
`;

function LandPageBody() {
  return (
	<>
		<BodyContainer>
			<Phrase><Icon><RiMapLine /></Icon>Descubre lugares</Phrase>
			<Phrase><Icon><RiPushpinLine /></Icon>Elige tu evento</Phrase>
			<Phrase><Icon><RiCalendarTodoLine /></Icon>Agenda tu fecha</Phrase>
		</BodyContainer>
	</>
  )
}

	
export default LandPageBody