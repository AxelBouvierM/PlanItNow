import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { NavBar } from '../../components/header/NavBar'
import { Footer } from '../../components/footer/Footer'
import { SearchBar } from '../../components/body/searchBar/SearchBar'
import { Categorias } from '../../components/body/searchBar/SearchCategories'
import Modal from '../../components/body/modal/Modal'
import styled from 'styled-components';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const TopSectionContainer = styled.div`
  display: block;
  position: relative;
`;

const Background = styled.div`
  display: flex;
  position: relative;
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

const SearchBarStyles = styled.div`
	display: flex;
  	justify-content: center;
  	margin: 1em 0 4.8em;
 	z-index: 2;
`;

const Images = styled.img`
	display: flex;
	border: none;
	border-radius: 20px;
	width: 100%;
	cursor: pointer;
`;

const FooterStyle = {
	position: 'absolute',
	bottom: '0',
}

function Restaurant() {
	const [data, setData] = useState([]);
	const [openModal, setOpenModal] = useState(false)
	const [selected, setSelected] = useState(null);
	const navigate = useNavigate();

	axios.get('/login/check')
		.then((res) => {
			if (res.data.response.status === 'User not logged in') navigate('/ingresar');
		})
		.catch((err) => {
			console.log(err);
		});
		
	useEffect(() => {
		axios.get('/data/restaurant')
			.then((res) => {
				const values = Object.values(res.data)
				setData(values)
			})
			.catch((err) => {
				console.log(err)
			});
	}, [])
	return (
		<>
			<TopSectionContainer>
				<Background>
					<Content>
						<NavBarContainer>
							<NavBar />
						</NavBarContainer>
						<Phrase>Restaurantes</Phrase>
						<SearchBarStyles>
							<SearchBar data={Categorias} />
						</SearchBarStyles>
						<LayoutMargin>
							<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
								<Masonry gutter='2.5em'>
									{data.map((item) => (
										<Images src={item.image} alt={item.title}
											key={item.image.toString()}
											onClick={() => { setOpenModal(true); setSelected(item); }} />
									))
									}
								</Masonry>
							</ResponsiveMasonry>
						</LayoutMargin>
						<Modal open={openModal} close={() => setOpenModal(false)} selected={selected} style={{ zIndex: '7' }} />
					</Content>
				</Background>
			</TopSectionContainer>
			<Footer style={{ FooterStyle }} />
		</>
	)
}

export default Restaurant
