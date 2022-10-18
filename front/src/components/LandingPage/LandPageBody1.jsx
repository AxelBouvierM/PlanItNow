import React from 'react';
import styled from 'styled-components';


const BodyContainer = styled.div`
	display: flex;
	position: absolute;
	top: 0;
	width: 100vw;
	height: 100vh;
	z-index: 2;
`;

const PhraseWrapper = styled.div`
	display: flex;
	position: relative;
	width: 50%;
	height: 100%;
	align-items: center;
	justify-content: center;
	padding: 0 2em 0 2em;
`;

const PhraseContainer = styled.div`
	display: inline-block;
	position: relative;
	width: 100%;
	max-height: 60%;
`;

const Title = styled.p`
	width: 100%;
	height: 100%;
	color: white;
	font-size: 2.4vw;
	font-weight: 500;
	padding: 0 1em 0.5em 1em;
	text-transform: uppercase;
`;

const Phrase = styled.p`
	width: 100%;
	height: 100%;
	color: white;
	font-size: 2.2vw;
	font-weight: 350;
	padding: 0 1em 0 1em;
`;

function LandPageBody() {
  return (
	<>
	<BodyContainer>
		  <PhraseWrapper>
			  <PhraseContainer>
					  <Title>Plan It Now!</Title>
					  <Phrase>¿Querés conocer nuevos eventos? </Phrase>
					  <Phrase>Únete ahora!</Phrase>
			  </PhraseContainer>
		  </PhraseWrapper>
	</BodyContainer>
	</>
  )
}

export default LandPageBody
