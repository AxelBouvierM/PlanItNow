import { React } from 'react';
import styled from "styled-components";
import { Outlet, Link } from 'react-router-dom';
import useFitText from "use-fit-text";

import { IconContext } from "react-icons";
import { RiCloseLine, RiMapPinLine, RiCalendarTodoLine, RiMoneyDollarCircleLine, RiCalendarCheckLine, RiInformationLine } from 'react-icons/ri';


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
  background-color: #F8F8FF;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 1);
  border-radius: 25px;
  z-index: 4;
  @media screen and (max-width:1279px) {
    	& {
     	max-width: 90vw;
			max-height: 85vh;
    	}
  	}
  @media screen and (max-width:300px) {
    	& {
     	max-width: 90vw;
			max-height: 80vh;
    	}
  	}
`;

const Top = styled.div`
  width:100%;
  height: auto;
  max-height: 50%;
  object-fit: cover;
  border-radius: 18px;
  justify-content: center;
  
`;

const Images = styled.img`
  width: 100%;
  display: flex;
  max-height: 80vh;
  margin-top: auto;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  justify-content: center;
  @media screen and (max-width:1279px) {
    	& {
			max-height: 75vh;
    	}
  	}
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
  max-height: calc(85vh * 0.50);
  height: 100%;
	font-size: 1.4em;
	font-weight: 350;
  background-color: #F8F8FF;
  color: black;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  z-index: 5;
  overflow-y: auto;
  @media screen and (max-width:300px) {
    	& {
			max-height: calc(80vh * 0.50);
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
  font-size: 0.8em;
	font-weight: 350;
  @media all and (max-width:405px) { 
    & { 
      font-size: 0.7em; 
    } 
  }
  @media all and (max-width:300px) { 
    & { 
      font-size: 0.5em; 
    } 
  }
`;

const Date = styled.div`
  display: flex;
  position: relative;
  width: fit-content;
	z-index: 3;
  padding: 1em 1em 0 1em;
`;
const Place = styled.div`
  width: fit-content;
	font-size: 1em;
	font-weight: 300;
  text-align: left;
  padding: 0 1em;
`;

const Price = styled.div`
	font-size: 1em;
	font-weight: 300;
  text-align: left;
  padding: 0 1em;
`;

const Description = styled.div`
  display: block;
  position: relative;
  max-height: calc(42.5vh * 0.4);
  height: 100%;
  margin: 0 1em 4em 1em;
	font-size: 0.7em;
	font-weight: 300;
  overflow-x: hidden;
`;

const BottomButtons = styled.div`
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 3.7em;
  height: 100%;
  border: none;
  text-decoration: none;
  color: white;
  font-size: 16px;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  z-index: 6;
`;

const MoreInfoButton = styled.button`
    display: inline-block;
    position:absolute; 
    bottom:0;
    left: 0;
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
   @media all and (max-width:400px) { 
    & { 
      font-size: 12px; 
    } 
   }
`;

const AgendaButton = styled.button`
    display: inline-block;
    position: absolute; 
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
    @media all and (max-width:400px) { 
    & { 
      font-size: 12px; 
    } 
   }
`;

const Modal = ({ open, close, selected }) => {
  const { fontSize, ref } = useFitText();
  if (!open) return null;

  return (
    <>
      <Overlay>
        <ModalContainer>
          <Top>
            <Images src={selected.image} />
          </Top>
          <BottomButtons>
            <a href={selected.link} target="_blank" rel="noreferrer">
              <MoreInfoButton><Icon><RiInformationLine /></Icon>Más información</MoreInfoButton>
            </a>
            <Link to='agenda'>
              <AgendaButton><Icon><RiCalendarCheckLine /></Icon>Agendar</AgendaButton>
            </Link>
            <Outlet />
          </BottomButtons>
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
            </Description>
          </Content>
        </ModalContainer>
      </Overlay>
    </>
  );
};
export default Modal;