import React from 'react'
import styled from 'styled-components'

import Icon from '../../images/pinLogoEstirado.png'
import { IconContext } from "react-icons";
import { RiInstagramLine, RiArrowDropUpLine } from 'react-icons/ri'
import { FaFacebookSquare } from 'react-icons/fa'


const AllPagesFooter = styled.footer`
	width: 100vw;
	display: block;
	position: relative;
	background-color: black;
	padding: 1em 2em;
`;

const LogoContainer = styled.div`
	display: flex;
	position: relative;
	padding-bottom: 0.6em;
`;

const Logo = styled.img`
	max-width: 7em;
	width: 20%;
	opacity: 0.7;
`;

const SocialContainer = styled.div`
	display: flex;
	position: relative;
	gap: 0.5em;
`;

const SocialButtons = styled.button`
	display: inline-block;
	position: relative;
	vertical-align: middle;
	opacity: 0.8;
	margin-right: 0.2em;
	cursor: pointer;
	background: none;
	border: none;
`;

const SocialButtons2 = styled.button`
	display: inline-block;
	position: relative;
	vertical-align: middle;
	opacity: 0.8;
	margin-right: 0.2em;
	cursor: pointer;
	background: none;
	border: none;
	border-bottom: 1px solid white;
`;

const SocialIcon = styled.i`
`;

const Line = styled.span`
	display:block;
   	width: 100%;
	margin-top: 1em;
   	border-top: 1px solid #ccc;
`;

const CopPhrase = styled.p`
	margin-top: 1em;
	color: white;
	opacity: 0.8;
`;

export function Footer() {
	
	function goTop() {
		document.body.scrollTop = 0; // for safari
		document.documentElement.scrollTop = 0; // for google chrome, firefox & ie
	}
  	return (

	<AllPagesFooter>
		<LogoContainer>
			<Logo src={Icon} />
		</LogoContainer>
		<SocialContainer>
			<SocialButtons2 type='button' onClick={goTop}>
				<SocialIcon>
					<IconContext.Provider value={{
						style: { verticalAlign: 'middle' },
						color: 'white',
						className: 'facebook',
						size: '2em'
						}}>
						<RiArrowDropUpLine />
					</IconContext.Provider>
				</SocialIcon>
			</SocialButtons2>
			<a href='https://www.facebook.com/'>
				<SocialButtons type='button' >
					<SocialIcon>
						<IconContext.Provider value={{
							style: { verticalAlign: 'middle' },
							color: 'white',
							className: 'facebook',
							size: '2em',
							}}>
									<FaFacebookSquare />
						</IconContext.Provider>
					</SocialIcon>
				</SocialButtons>
			</a>
			<a href='https://www.instagram.com/'>
				<SocialButtons type='button'>
					<SocialIcon>
						<IconContext.Provider value={{
							style: { verticalAlign: 'middle' },
							color: 'white',
							className: 'facebook',
							size: '2.1em'
							}}>
							<RiInstagramLine />
						</IconContext.Provider>
					</SocialIcon>
				</SocialButtons>
			</a>
					 
		</SocialContainer>
		<Line />
		<CopPhrase>©2022 Plan It Now, Holberton School</CopPhrase>
	</AllPagesFooter>
  )
}
