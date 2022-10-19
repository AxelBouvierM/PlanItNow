import { React } from 'react';
import styled from "styled-components";
import { Outlet, Link } from 'react-router-dom';

import { IconContext } from "react-icons";
import { RiCloseLine, RiMapPinLine, RiCalendarTodoLine, RiMoneyDollarCircleLine } from 'react-icons/ri';


const Overlay = styled.div`
    transition: all 400ms ease-in-out;
`;
const ModalContainer = styled.div`
  display: block;
  position: fixed;
  max-height: 85vh;
  height: 100%;
  max-width: 50vw;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 1);
  border-radius: 25px;
  z-index: 4;
  @media all and (max-width:1279px) {
    	& {
     	max-width: 90vw;
			max-height: 85vh;
    	}
  	}
  @media all and (max-width:300px) {
    	& {
     	max-width: 90vw;
			max-height: 80vh;
    	}
  	}
`;

const Top = styled.div`
  width:100%;
  height: 50%;
  object-fit: cover;
  border-radius: 18px;
`;

const Images = styled.img`
  width: 100%;
  height: 100%;
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
  display: block;
  position: relative;
  height: 50%;
  padding: 0.6em 1.2em;
	font-size: 1.4em;
	font-weight: 350;
  color: black;
  background-color: #F8F8FF;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  z-index: 5;
  @media all and (max-width:300px) {
    	& {
     	max-width: 90vw;
			max-height: 80vh;
    	}
  	}
`;

const Icon = styled.i`
  vertical-align: middle;
  margin: 0 0.4em 0 0;
`;

const InfoText = styled.p`
	display: inline-block;
	width: fit-content;
	color: #000;
  font-size: 1em;
	font-weight: 350;
`;

const Date = styled.div`
  display: flex;
  position: relative;
  width: fit-content;
	z-index: 3;
`;
const Place = styled.div`
  width: fit-content;
  margin-top: 0.3em;
	font-size: 1em;
	font-weight: 300;
  text-align: left;
`;

const Price = styled.div`
  margin-top: 0.3em;
	font-size: 1em;
	font-weight: 300;
  text-align: left;
`;

const Description = styled.p`
  max-height: 50%;
  margin-top: 0.5em;
	font-size: 0.8em;
	font-weight: 300;
  text-align: left;
  overflow-y: auto;
`;

const BottomButtons = styled.div`
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2em;
  border: none;
  text-decoration: none;
  color: white;
  font-size: 16px;
  margin-top: 1em;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
`;

const MoreInfoButton = styled.button`
    display: inline-block;
    position:absolute; 
    bottom:0;
    width: 50%;
    height: 100%;
    background-color: #8A3BE5;
    border: none;
    text-decoration: none;
    color: white;
    font-size: 16px;
    border-bottom-left-radius: 25px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
	  background-color: #6314BD;
   transition: 0.3s ease-in-out;
  }
`;

const AgendaButton = styled.button`
    display: inline-block;
    position:absolute; 
    bottom:0;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: #FF9519;
    border: none;
    text-decoration: none;
    color: white;
    font-size: 16px;
    border-bottom-right-radius: 25px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
	  background-color: #FF7E19;
    transition: 0.3s ease-in-out;
  }
`;

const Modal = ({ open, close, selected }) => {
  if (open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
    return null;
  }

	return (
    <>
			<Overlay>
				<ModalContainer>
					<Top>
						<Images src={selected.image} />
					</Top>
					<CloseBtn onClick={close}>
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
              <InfoText><Icon><RiCalendarTodoLine /></Icon>{selected.date}</InfoText>
            </Date>
						<Place>
              <InfoText><Icon><RiMapPinLine /></Icon>{selected.place}</InfoText>
            </Place>
            <Price>
              <InfoText><Icon><RiMoneyDollarCircleLine /></Icon>{selected.price}</InfoText>
            </Price>
						<Description>
            {selected.description}
            <BottomButtons>
                <a href={selected.link}>
                <MoreInfoButton>Más información</MoreInfoButton>
                </a>
                <Link to='agenda'>
                  <AgendaButton>Agendar</AgendaButton>
                </Link>
                <Outlet />
              </BottomButtons>
            </Description>
					</Content>
				</ModalContainer>
			</Overlay>
		</>
	);
};

export default Modal;
