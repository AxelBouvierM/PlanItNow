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
  	font-size: 2.6em;
  	text-transform: uppercase;
	text-align: center;
	font-weight: normal;
	font-family: 'kanit', sans-serif;
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

function Entretenimiento() {
	const [data, setData] = useState([]);
	const [openModal, setOpenModal] = useState(false)
	const [selected, setSelected] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		axios.get('/login/check')
			.then((res) => {
				if (res.data.response.status === 'User not logged in') navigate('/ingresar');
			})
			.catch((err) => {
				console.log(err);
			});
	}, [navigate])
		
	useEffect(() => {
		axios.get('/data/entertainment')
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
						<Phrase>Entretenimiento</Phrase>
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

export default Entretenimiento
