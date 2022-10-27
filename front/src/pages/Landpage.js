import { React, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import LandPageBody1 from '../components/LandingPage/LandPageBody1';
import LandPageBody2 from '../components/LandingPage/LandPageBody2';
import LandPageBody3 from '../components/LandingPage/LandPageBody3';
import LandPageBody4 from '../components/LandingPage/LandPageBody4';


import landpageBg3 from '../images/landpageBg3.jpg';
import landPageBg4 from '../images/landpageBg4.jpg';

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
  height: 70vh;
`;

function Landpage() {
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
      <LandPageBody1 />
      <BgContainer>
        <Bg1 src={landpageBg3} />
        <LandPageBody2 style={{ zIndex: '2'}}/>
      </BgContainer>
      <HowToUseContainer>
        <Bg2 src={landPageBg4} />
        <LandPageBody3 style={{ zIndex: '2' }} />
      </HowToUseContainer>
      <LandPageBody4 style={{ zIndex: '2' }} />
    </>
  )
}

export default Landpage
