import React from 'react'
import styled from 'styled-components'

import Icon from '../../images/testLogo.png'
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
	width: fit-content;
	display: flex;
	position: relative;
`;

const Logo = styled.img`
	width: 7em;
	height: 7em;
	opacity: 0.8;
`;

const SocialContainer = styled.div`
	display: flex;
	position: relative;
`;

const SocialButtons = styled.button`
	display: inline-block;
	position: relative;
	vertical-align: middle;
	padding-right: 1em;
	opacity: 0.8;
	cursor: pointer;
	background: none;
	border: none;
`;

const SocialIcon = styled.i`
`;

const Line = styled.span`
	display:block;
   	width: 100%;
	margin-top: 1em;
   	border-top: 1px solid #ccc
`;

const CopPhrase = styled.p`
	margin-top: 1em;
	color: white;
	opacity: 0.8;
`;

function Footer() {
	
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
			<a href='https://www.facebook.com/'>
				<SocialButtons type='button' >
					<SocialIcon>
						<IconContext.Provider value={{
							style: { verticalAlign: 'middle' },
							color: 'white',
							className: 'facebook',
							size: '2.5em',
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
							size: '2.8em'
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

export default Footer


/* <SocialButtons type='button' onClick={goTop}>
				<SocialIcon>
					<IconContext.Provider value={{
						style: { verticalAlign: 'middle' },
						color: 'white',
						className: 'facebook',
						size: '3.5em'
						}}>
						<RiArrowDropUpLine />
					</IconContext.Provider>
				</SocialIcon>
			</SocialButtons> */ 
