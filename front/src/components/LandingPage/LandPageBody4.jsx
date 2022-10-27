import React from 'react'
import styled from 'styled-components'

import Icon from '../../images/pinLogoEstirado.png'
import { IconContext } from "react-icons";
import { RiInstagramLine, RiArrowDropUpLine, RiGithubLine } from 'react-icons/ri'

const AllPagesFooter = styled.footer`
	width: 100vw;
	height: 10em;
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

export function LandPageBody4() {

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
				<a href='https://github.com/AxelBouvierM/PlanItNow/' target="_blank" rel="noreferrer">
					<SocialButtons type='button' >
						<SocialIcon>
							<IconContext.Provider value={{
								style: { verticalAlign: 'middle' },
								color: 'white',
								className: 'Github',
								size: '2em',
							}}>
								<RiGithubLine />
							</IconContext.Provider>
						</SocialIcon>
					</SocialButtons>
				</a>
				<a href='https://www.instagram.com/planitnow_' target="_blank" rel="noreferrer">
					<SocialButtons type='button'>
						<SocialIcon>
							<IconContext.Provider value={{
								style: { verticalAlign: 'middle' },
								color: 'white',
								className: 'Instagram',
								size: '2.1em'
							}}>
								<RiInstagramLine />
							</IconContext.Provider>
						</SocialIcon>
					</SocialButtons>
				</a>

			</SocialContainer>
			<Line />
			<CopPhrase>©2022 Plan It Now, Holberton School Portfolio</CopPhrase>
		</AllPagesFooter>
	)
}

export default LandPageBody4
