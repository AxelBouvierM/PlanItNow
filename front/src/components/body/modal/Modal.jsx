import React from 'react';
import styled from "styled-components";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../hooks/debounceHook';

import { IconContext } from "react-icons";
import { RiCloseLine, RiCalendar2Fill, RiCalendarTodoLine } from 'react-icons/ri';



const ModalContainer = styled.div`
  max-height: 85vh;
  height: 100%;
  max-width: 50vw;
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  background-color: #ffffff;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
  transition: 1s ease-in-out;
`;
const Images = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fil;
  position: relative;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const CloseBtn = styled.button`
  position: fixed;
  border: none;
  top: 8px;
  border-radius: 20px;
  right: 1em;
  color: black;
  cursor: pointer;
`;

const Content = styled.div`
  position: absolute;
  padding: 0.6em 1.2em;
	font-size: 1.4em;
	font-weight: 350;
  color: black;
  background-color: #F8F8FF;
  width: 100%;
  height: 50%;
  top: 50%;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  z-index: 5;
  overflow-y: auto;
`;
const Top = styled.div`
  width:100%;
  height: 50%;
  object-fit: cover;
  border-radius: 18px;
`;
const Place = styled.h1`
  margin-top: 0.3em;
	font-size: 1em;
	font-weight: 300;
  text-align: left;
`
const Price = styled.h2`
  margin-top: 0.3em;
	font-size: 1em;
	font-weight: 300;
  text-align: left;
`
const Description = styled.h2`
  margin-top: 0.3em;
	font-size: 0.8em;
	font-weight: 300;
  text-align: left;
`
const Date = styled.h2`
width: fit-content;
  margin-top: 0.3em;
	font-size: 1em;
	font-weight: 300;
  text-align: left;
`
const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`

const ButtonAgendar = styled.button`
    background-color: #008CBA;
    border: none;
    right: 0;
    bottom:0;
    position: absolute;
    text-decoration: none;
    color: white;
    display: inline-block;
    font-size: 16px;
    width: 150px;
    height: 30px;
    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
    border-bottom-right-radius: 25px;
    &:hover {
	  background-color: royalblue;
   transition: 0.3s ease-in-out;
  }
`
const ButtonVerMas = styled.a`
    background-color: #008CBA;
    border: none;
    left: 0;
    bottom:0;
    position: absolute;
    text-decoration: none;
    color: white;
    display: inline-block;
    font-size: 16px;
    width: 150px;
    height: 30px;
    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
    border-bottom-left-radius: 25px;
    &:hover {
	  background-color: royalblue;
   transition: 0.3s ease-in-out;
  }
`
const Icon = styled.i`
  vertical-align: middle;
  top: 50%;
`;

const DateText = styled.i`
  margin: 0.5em 0.5em;
`;

const Modal = ({ open, onClose, selected }) => {
	if (!open) return null;
	console.log();

  const HandleClick = (event, message) => {
    console.log(message);
  }

	return (
		<>
			<Overlay onClick={onClose}>
				<ModalContainer>
					<Top>
						<Images src={selected.image} />
					</Top>
					<CloseBtn onClick={onClose}>
						<IconContext.Provider value={{
						style: { verticalAlign: 'middle' },
						color: '#000000',
						className: 'enter',
						size: '2em'
						}}>
							<RiCloseLine />
						</IconContext.Provider>
					</CloseBtn>
					<Content>
            <Date>
              <Icon>
                <IconContext.Provider value={{
                  style: { verticalAlign: 'middle' },
                  color: '#000000',
                  className: 'enter',
                  size: '1.3em'
                }}>
                  <RiCalendarTodoLine />
                </IconContext.Provider>
              </Icon> 
                <DateText>{selected.date}</DateText>
            </Date>
						<Place>Lugar: {selected.place}</Place>
						<Price>Precio: {selected.price}</Price>
						<Description>Description: {selected.description}</Description>
						<Link to="/agenda"><ButtonAgendar type="button"
						>Agendar
						</ButtonAgendar>
						</Link>
						<Outlet />
            <ButtonVerMas
              onClick={event => HandleClick(event, 'Hello')}
              href={selected.link}
              target="_blank"
              rel="noreferrer">
              Mas informacion
            </ButtonVerMas>
					</Content>
				</ModalContainer>
			</Overlay>
		</>
	);
};

export default Modal;
