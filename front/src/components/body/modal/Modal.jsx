import { React } from 'react';
import styled from "styled-components";
import { motion } from 'framer-motion';

import { IconContext } from "react-icons";
import { RiCloseLine, RiMapPinLine, RiCalendarTodoLine, RiMoneyDollarCircleLine, RiDoubleQuotesL, RiSendPlaneLine } from 'react-icons/ri';

const modalTransition = { type: "spring", stiffness: 100 };

const ModalContainer = styled(motion.div)`
  display: block;
  position: fixed;
  border: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #F8F8FF;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 1);
  border-radius: 20px;
  z-index: 4;
  @media all and (max-width: 600px) {
    width: 85vw;
  }
`;

const Top = styled.div`
  display: block;
  position: relative;
  max-height: 40vh;
  object-fit: cover;
  justify-content: center;
  overflow: hidden;
`;

const Images = styled.img`
  width: 100%;
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
  color: #000;
  background-color: #fafafa;
  cursor: pointer;
  z-index: 10;
`;

const Content = styled.div`
  display: block;
  position: relative;
  max-height: calc(80vh * 0.50);
	font-size: 1em;
	font-weight: 350;
  text-align: left;
  background-color: #F8F8FF;
  color: black;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  z-index: 5;
  overflow: auto;
  padding: 1em;
`;

const Icon = styled.i`
  vertical-align: middle;
  margin: 0.1em 0.4em 0 0;
`;

const InfoText = styled.p`
	display: block;
	width: fit-content;
	color: #000;
  font-size: 1em;
	font-weight: 550;
  font-family: 'Lexend', sans-serif;
`;

const EventContainer = styled.div`
  width: fit-content;
  text-align: left;
  padding: 0.2em 0;
`;

const EventData = styled.div`
  height: 50%;
  width: fit-content;
	font-weight: 300;
  text-align: left;
`;

const Description = styled.div`
  height: 50%;
  width: fit-content;
  text-align: left;
  margin-top: 1em;
  font-family: 'Barlow', sans-serif;
`;

const Buttons = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 3.7em;
`;

const MoreInfoButton = styled.a`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding:0.35em 1.2em;
  border:0.1em solid #FFFFFF;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:350;
  color:#fafafa;
  background-color: #9D239D;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    color:#000;
    background-color: #fafafa;
  }
`;

const Modal = ({ open, close, selected }) => {
  if (!open) return null;

  return (
    <>
        <ModalContainer
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={modalTransition}>
          <Top>
            <Images src={selected.image} />
          </Top>
          <CloseBtn onClick={close}>
            <IconContext.Provider value={{
              style: { verticalAlign: 'middle' },
              className: 'enter',
              size: '2em',
            }}>
              <RiCloseLine />
            </IconContext.Provider>
          </CloseBtn>
          <Content>
            <EventContainer>
              <EventData>
                <InfoText><Icon><RiDoubleQuotesL /></Icon>{selected.title}</InfoText>
                <InfoText><Icon><RiCalendarTodoLine /></Icon>{selected.date}</InfoText>
                <InfoText><Icon><RiMapPinLine /></Icon>{selected.place}</InfoText>
                <InfoText><Icon><RiMoneyDollarCircleLine /></Icon>{selected.price}</InfoText>
              </EventData>
              <Description>{selected.description}</Description>
            </EventContainer>
          </Content>
          <Buttons>
          <MoreInfoButton href={selected.link} target="_blank" rel="noreferrer"><Icon><RiSendPlaneLine /></Icon>Ir al sitio web</MoreInfoButton>
          </Buttons>
        </ModalContainer>
    </>
  );
};
export default Modal;
