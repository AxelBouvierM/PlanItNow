import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const BodyContainer = styled.div`
  	display: block;
  	position: absolute;
  	width: 100vw;
  	justify-content: center;
	top: 50%;
    transform: translateY(-50%);
	padding: 0 5em;
	z-index: 3;
	@media all and (max-width:600px) {
    	& {
			padding: 0 1em;
    	}
  	}
`;

const Phrase = styled.p`
	color: white;
  	font-size: 3em;
	margin-bottom: 0.5em;
	@media all and (max-width:600px) {
    	& {
			text-align: center;
			display: block;
     		font-size: 1.6em;
			margin: auto;
			padding: 0.5em;
    	}
  	}
`;

const AccountButton = styled.button`
  display:inline-block;
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
  font-size: 0.9em;
  cursor: pointer;
  &:hover {
    color:#000000;
    background-color: #fafafa;
  }
`;
  
function LandPageBody() {
  return (
	<>
		<BodyContainer>
			<Phrase>¿Querés conocer nuevos eventos?</Phrase>
			<Phrase>Únete ahora!</Phrase>
			<Link to="/registrarse">
				<AccountButton type="button">Registrarse</AccountButton>
			</Link>
			<Outlet/>
		</BodyContainer>
	</>
  )
}

	
export default LandPageBody
