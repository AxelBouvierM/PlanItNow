import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { NavBar } from '../../components/header/NavBar'
import {Footer} from '../../components/footer/Footer'
import categoriesBg from '../../images/montaña2.jpg'
import { SearchBar } from '../../components/body/searchBar/SearchBar'
import Modal from '../../components/body/modal/Modal'

import styled from 'styled-components';

const TopSectionContainer = styled.div`
  display: block;
  position: relative;
`;

const Background = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  background-image: url(${categoriesBg});
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

const NavBarContainer = styled.div`
	display: block;
	position: relative;
	top: 1%;
	z-index: 5;
	width: 100%;
	height: fit-content;
`;

const SearchBarStyles = styled.div`
	display: flex;
  	justify-content: center;
  	margin: 1.5em 0 6em;
 	z-index: 2;
`;

const DataContainer = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: [col] 30% [col] 30% [col] 30%;
	grid-gap: 1em;
	justify-content: center;
	@media all and (max-width:850px) and (min-width:400px) {
    	& {
			grid-template-columns: [col] 45% [col] 45%;
    	}
  	}
	@media all and (max-width:400px) {
    	& {
			grid-template-columns: [col] 90%;
    	}
  	}
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
function Music() {
	const [data, setData] = useState([]);
	const [openModal, setOpenModal] = useState(false)
	const [selected, setSelected] = useState(null);
	
	useEffect(() => {
		axios.get('/data/music')
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
						<NavBar/>
					</NavBarContainer>
					<SearchBarStyles>
						<SearchBar />
					</SearchBarStyles>
					<DataContainer>
							{data.map((item) => (
								<>
									<Images src={item.image} alt={item.title} key={'Image' + item} onClick={() => { setOpenModal(true); setSelected(item); }} />
								</>
							))}
							<Modal open={openModal} close={() => setOpenModal(false)} selected={selected} style={{ zIndex: '4' }} />
					</DataContainer>
				</Content>
			</Background>

		</TopSectionContainer>
		<Footer style={{ FooterStyle }}/>
		</>
		

  	)
}

export default Music
