import React from 'react'
import errorPage from '../images/404.jpg'
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom'
import { RiHome2Line } from 'react-icons/ri'

const Background = styled.div`
  border: 1px solid #000; 
  background-image: url(${errorPage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;

const Text = styled.p`
	display: block;
	position: absolute;
	color: white;
	left: 5%;
	bottom: 17%;
	font-size: 2em;
	width: 40%;
`;

const Button = styled.button`
  display: block;
  position: absolute;
  padding:0.35em 3em;
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
  margin-top: 1em;
  font-size: 1.5em;
  bottom: 8%;
  left: 5%;
  cursor: pointer;
  &:hover {
    color:#000000;
    background-color: #fafafa;
  }
`;

function NoPage() {
	return (
		<Background>
			<Text>Te desviaste del camino, vuelve para explorar eventos!</Text>
			<Link to='/inicio' style={{ color: '#fafafa', textDecoration: 'none' }}><Button><RiHome2Line /></Button></Link>
			<Outlet />
		</Background>
		)
};

export default NoPage;
