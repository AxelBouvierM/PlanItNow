import React from 'react';
import styled from 'styled-components';


const BodyContainer = styled.div`
	display: flex;
	position: relative;
	width: 100vw;
	height: 90vh;
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

const SecondBodyContainer = styled.div`
	display: flex;
	position: relative;
	width: 100vw;
	height: 100vh;
	align-items: center;
	flex-direction: column;
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
	<SecondBodyContainer>
	</SecondBodyContainer>
	</>
  )
}

export default LandPageBody
