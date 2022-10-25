import { React, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import profileBg from '../images/landpageBg1.jpg';
import { NavBar } from '../components/header/NavBar.jsx';
import { Footer } from '../components/footer/Footer';
import { avatarImages } from '../components/profile/ProfileImages';
import ChangePswdModal from '../components/body/modal/ChangePswdModal';

const Background = styled.div`
  display: flex;
  position: relative;
  background-image: url(${profileBg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
`;

const TopSectionContainer = styled.div`
  display: block;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  margin: 0;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const Phrase = styled.p`
	display: block;
  	color: white;
  	font-size: 2.5em;
  	text-transform: uppercase;
	text-align: center;
	font-weight: normal;
	font-family: 'Lexend', sans-serif;
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

const NavBarStyles = styled.div`
    display: flex;
    position: relative;
    top: 1%;
    z-index: 5;
    width: fit-content;
    margin-bottom: 2.5em;
`;

const LayoutMargin = styled.div`
	display: block;
	margin: 1.5em auto;
`;

const Images = styled.img`
	display: flex;
	border-radius: 360px;
	padding: 1em;
	max-width: 15em;
	margin: auto;
	border: solid #fafafa;
`;

const ProfileContainer = styled.div`
	display: block;
	width: fit-content;
	height: fit-content;
	background-color: transparent;
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
	font-family: 'Barlow', sans-serif;
`

const Button = styled.button`
  display:inline-block;
  margin: 1em 1em;
  padding:0.35em 1.2em;
  border:0.1em solid #FFFFFF;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;
  font-weight:350;
  color:#FFFFFF;
  font-size: 18px;
  background-color: transparent;
  transition: all 0.2s;
  font-family: 'Lexend', sans-serif;
  cursor: pointer;
  &:hover {
    color:#000000;
    background-color: #fafafa;
  }
`;

function Profile() {
	const [data, setData] = useState([]);
	const [openModal, setOpenModal] = useState(false)
	const navigate = useNavigate();

	axios.get('/login/check')
		.then((res) => {
			if (res.data.response.status === 'User not logged in') navigate('/ingresar');
		})
		.catch((err) => {
			console.log(err);
		});


	useEffect(() => {
		axios.get('/user')
			.then((res) => {
				setData(res.data.user)
			})
			.catch((err) => {
				console.log(err)
			});
	}, [])

	return (
		<>
			<Background>
				<TopSectionContainer>
					<NavBarStyles>
						<NavBar />
					</NavBarStyles>
					<Content>
						<Phrase>Perfil</Phrase>
						<LayoutMargin>
							<Images src={avatarImages[data.avatar]} />
						</LayoutMargin>
						<ProfileContainer>
							<User>{data.username}</User>
							<User>{data.email}</User>
							<Button onClick={() => { setOpenModal(true) }}>Cambiar contraseña</Button>
						</ProfileContainer>
						<ChangePswdModal open={openModal} close={() => setOpenModal(false)} />
					</Content>
				</TopSectionContainer>
			</Background>
			<Footer />
		</>
	)
}

export default Profile
