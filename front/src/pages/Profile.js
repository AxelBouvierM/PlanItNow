import { React, useEffect, useState } from 'react';
import axios from 'axios';
import profile from '../images/landpageBg1.jpg'
import { NavBar } from '../components/header/NavBar.jsx'
import { Footer } from '../components/footer/Footer'
import styled from 'styled-components';

import logo from '../images/pinLogoApp.png'
import ChangePswdModal from '../components/body/modal/ChangePswdModal'

const TopSectionContainer = styled.div`
  display: block;
  position: relative;
`;

const Background = styled.div`
  display: flex;
  position: relative;
  background-image: url(${profile});
  flex-wrap: wrap;
  background-color: black;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  margin-bottom: 6em;
`;

const Phrase = styled.p`
  	margin-top: 1em;
  	color: white;
  	font-size: 2.5em;
  	text-transform: uppercase;
	text-align: center;
	font-weight: normal;
	font-family: 'Fira Sans', sans-serif;
	animation: neon 3s infinite;
	@keyframes neon {
	0% {
		text-shadow: -1px -1px 1px white, -1px 1px 1px white, 1px -1px 1px white, 1px 1px 1px white,
		0 0 3px white, 0 0 10px white, 0 0 20px white,
		0 0 30px #FF9E9E, 0 0 40px #FF9E9E, 0 0 50px #FF9E9E, 0 0 70px #FF9E9E, 0 0 100px #FF9E9E, 0 0 200px #FF9E9E;
	}
	50% {
		text-shadow: -1px -1px 1px white, -1px 1px 1px white, 1px -1px 1px white, 1px 1px 1px white,
		0 0 5px white, 0 0 15px white, 0 0 25px white,
		0 0 40px #FF9E9E, 0 0 50px #FF9E9E, 0 0 60px #FF9E9E, 0 0 80px #FF9E9E, 0 0 110px #FF9E9E, 0 0 210px #FF9E9E;
	}
	100% {
		text-shadow: -1px -1px 1px white, -1px 1px 1px white, 1px -1px 1px white, 1px 1px 1px white,
		0 0 3px white, 0 0 10px white, 0 0 20px white,
		0 0 30px #FF9E9E, 0 0 40px #FF9E9E, 0 0 50px #FF9E9E, 0 0 70px #FF9E9E, 0 0 100px #FF9E9E, 0 0 200px #FF9E9E;
	}
	}
	@media all and (max-width:400px) {
    	& {
			font-size: 1.8em;
    	}
  	}
`;

const NavBarContainer = styled.div`
	display: block;
	position: relative;
	top: 1%;
	z-index: 5;
	width: fit-content;
	height: fit-content;
`;

const LayoutMargin = styled.div`
	margin: 0 5em;
	@media all and (max-width:400px) {
    	& {
			margin: 0 1em;
    	}
  	}
	@media all and (max-width:800px) and (min-width: 401px) {
    	& {
			margin: 0 3em;
    	}
  	}
`;



const FooterStyle = {
	position: 'absolute',
	bottom: '0',
}

const Images = styled.img`
	display: flex;
	border-radius: 360px;
	padding: 20px;
	width: 18em;
	height: 18em;
	margin: auto;
	border: solid white;
`;

const ProfileContainer = styled.div`
	background-color: transparent;
	height: 20em;
    width: 34em;
	margin: auto;
	backdrop-filter: blur(0px);
	text-align: center;
`

const User = styled.p`
	font-size: 22px;
	padding-top: 10px;
	color: white;
	margin: auto;
	text-align:center;
`

const Button = styled.button`
  display:inline-block;
  margin: 1em 1em;
  padding:0.35em 1.2em;
  border:0.1em solid #FFFFFF;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:350;
  color:#FFFFFF;
  font-size: 18px;
  background-color: transparent;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    color:#000000;
    background-color: #fafafa;
  }
`;
const userStyle = styled.p`

	color: white;
	margin: auto;
	text-align:center;
`

function Profile() {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get('/user')
			.then((res) => {
				const values = Object.values(res.data)
				setData(values)
			})
			.catch((err) => {
				console.log(err)
			});
	}, [])

	const [openModal, setOpenModal] = useState(false)

	return (
		<>
			<TopSectionContainer>
				<Background>
					<Content>
						<NavBarContainer>
							<NavBar />
						</NavBarContainer>
						<Phrase>Perfil
						</Phrase>
						<LayoutMargin>
							<Images img src={logo} />
						</LayoutMargin>
						<ProfileContainer>
							<User>
								{data.map((item) => (
									<userStyle>{item.username}</userStyle>
								))
								}
							</User>
							<User>
								{data.map((item) => (
									<userStyle>{item.email}</userStyle>
								))
								}
							</User>
							<Button
								onClick={() => { setOpenModal(true) }}
							>Cambiar Contraseña</Button>
							<ChangePswdModal l open={openModal} close={() => setOpenModal(false)} />
						</ProfileContainer>
					</Content>
				</Background>
			</TopSectionContainer>
			<Footer style={{ FooterStyle }} />
		</>
	)
}

export default Profile
