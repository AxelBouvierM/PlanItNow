import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { RiLinkedinFill, RiGithubFill } from 'react-icons/ri';
import axel from '../../images/landpagePics/axel.jpg';
import maxi from '../../images/landpagePics/maxi.jpg';
import mati from '../../images/landpagePics/mati.jpg';
import eze from '../../images/landpagePics/eze.jpg';


const BodyContainer = styled.div`
  	display: flex;
  	position: relative;
  	width: 100vw;
	height: 100vh;
	padding: 0 5em;
	z-index: 3;
	justify-content: center;
	align-items: center;
`;

const Divisor = styled.div`
	display: block;
	position: absolute;
	left: 0; 
  	right: 0;
	top: 0;
  	margin-left: auto; 
  	margin-right: auto;
	padding: 0 5em;
  	width: 100%;
`;

const Title = styled(motion.p)`
	display: inline-block;
	position: relative;
	width: 100%;
	color: white;
	font-size: 3em;
	font-family: 'kanit', sans-serif;
	margin: 1em 0;
	text-align: right;
`;

const ContentWrapper = styled.div`
	display: inline-block;
	position: relative;
	width: 100%;
	color: white;
  	font-size: 1em;
	text-align: center;
	margin: 0 0.5em;
`;
const ContentContainer = styled(motion.div)`
	display: inline-block;
	position: relative;
	width: 22.5%;
	color: white;
  	font-size: 1em;
	text-align: center;
	margin: 0 0.5em;
`;

const Image = styled.img`
	display: block;
	position: relative;
	max-width: 100%;
	max-height: 50vh;
	color: white;
	border: none;
	text-align: center;
	margin-left: auto;
  	margin-right: auto;
	margin-top: 1em;

`;

const Phrase = styled.p`
	display: block;
	position: relative;
	color: white;
  	font-size: 1.2em;
	font-family: 'Lexend', sans-serif;
	margin: 1em;
`;

const SocialContainer = styled.p`
	display: inline-block;
	position: relative;
	color: white;
	font-family: 'Lexend', sans-serif;
`;

const SocialButton = styled.button`
  display:inline-block;
  padding:0.35em 1em;
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
  margin: 0 0.5em;
  cursor: pointer;
  &:hover {
    color:#000000;
    background-color: #fafafa;
  }
`;

const Icon = styled.i`
  vertical-align: middle;
  font-size: 1em;
`;

function LandPageBody3() {
	return (
		<BodyContainer>
			<Divisor>
				<Title
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{
						ease: "easeInOut",
						duration: 2.5,
						delay: 0.1,
					}}
					viewport={{ once: true }}>Nuestro Equipo</Title>
				<ContentWrapper>
					<ContentContainer
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{
							ease: "easeInOut",
							duration: 1.25,
							delay: 0.5,
						}}
						viewport={{ once: true }}>
						<Image src={axel} alt='axel' />
						<Phrase>Axel Bouvier</Phrase>
						<SocialContainer>
							<a href='https://www.linkedin.com/in/axel-bouvier-172b76214/' target="_blank" rel="noreferrer">
							<SocialButton><Icon><RiLinkedinFill /></Icon></SocialButton>
							</a>
							<a href='https://github.com/AxelBouvierM' target="_blank" rel="noreferrer">
							<SocialButton><Icon><RiGithubFill /></Icon></SocialButton>
							</a>
						</SocialContainer>
					</ContentContainer>
					<ContentContainer
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{
							ease: "easeInOut",
							duration: 1.25,
							delay: 1,
						}}
						viewport={{ once: true }}>
						<Image src={maxi} alt='maximiliano'/>
						<Phrase>Maximiliano Alonso</Phrase>
						<SocialContainer>
							<a href='https://www.linkedin.com/in/maximiliano-alonso-262b05123/' target="_blank" rel="noreferrer">
							<SocialButton><Icon><RiLinkedinFill /></Icon></SocialButton>
							</a>
							<a href='https://github.com/MaxiHBTN' target="_blank" rel="noreferrer">
							<SocialButton><Icon><RiGithubFill /></Icon></SocialButton>
							</a>
						</SocialContainer>
					</ContentContainer>
					<ContentContainer
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{
							ease: "easeInOut",
							duration: 1.25,
							delay: 1.5,
						}}
						viewport={{ once: true }}>
						<Image src={mati} alt='matias'/>
						<Phrase>Matías Martínez</Phrase>
						<SocialContainer>
							<a href='https://www.linkedin.com/in/matiasmartinezhirsiger/' target="_blank" rel="noreferrer">
							<SocialButton><Icon><RiLinkedinFill /></Icon></SocialButton>
							</a>
							<a href='https://github.com/MatiasMtz' target="_blank" rel="noreferrer">
							<SocialButton><Icon><RiGithubFill /></Icon></SocialButton>
							</a>
						</SocialContainer>
					</ContentContainer>
					<ContentContainer
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{
							ease: "easeInOut",
							duration: 1.25,
							delay: 2,
						}}
						viewport={{ once: true }}><Image src={eze} alt='ezequiel'/>
						<Phrase>Ezequiel Silva</Phrase>
						<SocialContainer>
							<a href='https://www.linkedin.com/in/ezequiel-silva-perez-1262b115b/' target="_blank" rel="noreferrer">
							<SocialButton><Icon><RiLinkedinFill /></Icon></SocialButton>
							</a>
							<a href='https://github.com/ezesilva95' target="_blank" rel="noreferrer">
							<SocialButton><Icon><RiGithubFill /></Icon></SocialButton>
							</a>
						</SocialContainer>
					</ContentContainer>
				</ContentWrapper>
			</Divisor>
		</BodyContainer>
	)
}


export default LandPageBody3
