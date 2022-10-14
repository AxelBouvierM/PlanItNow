import React from 'react'

import styled from 'styled-components';

import { IconContext } from "react-icons";
import { RiSearchEyeLine, RiPushpinLine, RiCalendarCheckLine } from 'react-icons/ri'

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

const ImageContainer = styled.div`
	display: flex;
	position: relative;
	width: 60%;
	height: 100%;
`;

const DecImage = styled.img`
	display: flex;
	position: relative;
	width: 100%;
	height: auto;
	padding: 2em;
`;

const SecondBodyContainer = styled.div`
	display: flex;
	position: relative;
	width: 100vw;
	height: 100vh;
	align-items: center;
	flex-direction: column;
`;

const OfferContainer = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	height: 30%;
	background-color: #2E2E2E;

`;

const DiscoverContainer = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	width: 33%;
	height: 100%;
	&:hover {
  		transition: 0.2s ease-in-out;
		background-color: rgba(0,0,0,0.20);
	}
`;

const ContainerScale = styled.div`
	display: flex;
	position: relative;
	width: 90%;
	height: 90%;
	&:hover {
  		transition: 0.2s ease-in-out;
		transform: scale(1.1);
		overflow: hidden;
	}
`;

const Discover = styled.div`
	display: block;
	position: relative;
	width: 100%;
	height: 100%;
	&:hover {
  		transition: 0.2s ease-in-out;
	}
`;

const DiscoverIconContainer = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	height: 60%;
	margin-top: 1em;
	justify-content: center;
`;

const DiscoverIcon = styled.span`
	width: 5.5em;
	height: 5.5em;
	display: flex;
	position: relative;
	border: solid 3px #fafafa;
	border-radius: 50%;
	margin: auto;
	text-align: center;
	justify-content: center;
	&:hover {
		background-color: #FAA10E;
  		transition: 0.2s ease-in-out;
	}
`;

const Icon = styled.i`
	margin: auto;
`;

const DiscoverTextContainer = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	height: 30%;
	align-items: center;
	justify-content: center;
	padding-bottom: 2em;
`;

const DiscoverText = styled.p`
	color: #fafafa;
	font-size: 1.3em;
	text-transform: uppercase;
`;

const ScheduleContainer = styled.div`
	display: flex;
	position: relative;
	width: 33.3%;
	height: 100%;
	align-items: center;
	justify-content: center;
	&:hover {
		background-color: rgba(0,0,0,0.20);
  		transition: 0.2s ease-in-out;
	}
`;

const AnotherOffer = styled.div`
	display: flex;
	position: relative;
	width: 33.3%;
	height: 100%;
	align-items: center;
	justify-content: center;
	&:hover {
		background-color: rgba(0,0,0,0.20);
  		transition: 0.2s ease-in-out;
	}
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
		  <ImageContainer>
			  <DecImage />
		  </ImageContainer>
	</BodyContainer>
	<SecondBodyContainer>
		<OfferContainer>
			<DiscoverContainer>
				<ContainerScale>
					<Discover>
							<DiscoverIconContainer>
								<DiscoverIcon>
									<Icon>
										<IconContext.Provider value={{
										color: '#fafafa',
										className: 'enter',
										size: '3em'
										}}>
											<RiSearchEyeLine />
										</IconContext.Provider>
									</Icon>
								</DiscoverIcon>
							</DiscoverIconContainer>
							<DiscoverTextContainer>
								<DiscoverText>Descubre lugares</DiscoverText>
							</DiscoverTextContainer>
					</Discover>
				</ContainerScale>
			</DiscoverContainer>
			<ScheduleContainer>
				<ContainerScale>
					<Discover>
							<DiscoverIconContainer>
								<DiscoverIcon>
									<Icon>
										<IconContext.Provider value={{
											color: '#fafafa',
											className: 'enter',
											size: '3em'
											}}>
											<RiPushpinLine />
										</IconContext.Provider>
									</Icon>
								</DiscoverIcon>
							</DiscoverIconContainer>
							<DiscoverTextContainer>
								<DiscoverText>Elige tu evento</DiscoverText>
							</DiscoverTextContainer>
					</Discover>
				</ContainerScale>
			</ScheduleContainer>
			<AnotherOffer>
				<ContainerScale>
					  <Discover>
						  	<DiscoverIconContainer>
									<DiscoverIcon>
										<Icon>
											<IconContext.Provider value={{
												color: '#fafafa',
												className: 'enter',
												size: '3em'
											}}>
												<RiCalendarCheckLine />
											</IconContext.Provider>
										</Icon>
									</DiscoverIcon>
							  </DiscoverIconContainer>
							  <DiscoverTextContainer>
							  	<DiscoverText>Agenda tu fecha </DiscoverText>
							  </DiscoverTextContainer>
					  </Discover>
				</ContainerScale>
			</AnotherOffer>
		</OfferContainer>
	</SecondBodyContainer>
	</>
  )
}

export default LandPageBody
