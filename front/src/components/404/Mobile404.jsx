import React from 'react'
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom'
import { RiHome2Line } from 'react-icons/ri'

import mobileErrorPage from '../../images/404Mobile.jpg'

const Background = styled.div`
  border: 1px solid #000; 
  background-image: url(${mobileErrorPage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
`;

const Button = styled.button`
  display: block;
  position: absolute;
  padding: 0.5em 0;
  border:0.1em solid #FFFFFF;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  color:#FFFFFF;
  text-align:center;
  transition: all 0.2s;
  background-color: transparent;
  font-size: 1.5em;
  bottom: 8%;
  left: 0;
  right: 0;
  margin: 0em 3em;
  cursor: pointer;
  &:hover {
    color:#000000;
    background-color: #fafafa;
  }
`;

function NoPageMobile() {
	return (
		<Background>
			<Link to='/inicio' style={{ color: '#fafafa', textDecoration: 'none' }}><Button><RiHome2Line /></Button></Link>
			<Outlet />
		</Background>
	)
};

export default NoPageMobile;
