import { React, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import LandPageBody1Mobile from './LandPageBody1Mobile';
import LandPageBody2Mobile from './LandPageBody2Mobile';
import LandPageBody3Mobile from './LandPageBody3Mobile';
import { Footer } from '../footer/Footer';


import landpageBg3 from '../../images/landpageBg3.jpg';
import landPageBg4 from '../../images/landpageBg4.jpg';

const LandingContainer = styled.div`
  display: block;
  position: relative;
`;

const BgContainer = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const Bg1 = styled.img`
  display: flex;
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const Bg2 = styled.img`
  display: flex;
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const HowToUseContainer = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const FooterContainer = styled(motion.div)`
  display: flex;
  position: relative;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

function MobileLanding() {
	const navigate = useNavigate();

	useEffect(() => {
		axios.get('/login/check')
			.then((res) => {
				if (res.data.response.status === 'Ok') navigate('/inicio');
			})
			.catch((err) => {
				console.log(err);
			});
	}, [navigate])

	return (
		<>
			<LandingContainer>
				<LandPageBody1Mobile />
				<BgContainer>
					<Bg1 src={landpageBg3} />
					<LandPageBody2Mobile style={{ zIndex: '2' }} />
				</BgContainer>
				<HowToUseContainer>
					<Bg2 src={landPageBg4} />
					<LandPageBody3Mobile style={{ zIndex: '2' }} />
				</HowToUseContainer>
			</LandingContainer>
			<FooterContainer>
				<Footer />
			</FooterContainer>
		</>
	)
}

export default MobileLanding
