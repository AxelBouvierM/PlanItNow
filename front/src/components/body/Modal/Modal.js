import React from 'react';
import styled from "styled-components";



const ModalContainer = styled.div`
  max-height: 75vh;
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
  height: 43%;
  object-fit: fil;
  position: relative;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const CloseBtn = styled.p`
  position: fixed;
  top: 8px;
  right: 8px;
  color: black;
  cursor: pointer;
`;

const Content = styled.div`
  position: absolute;
	font-size: 1.4em;
	font-weight: 300;
  color: black;
  background-color: #F8F8FF;
  width: 100%;
  height: 40%;
  top: 60%;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  z-index: 5;
`;
const Top = styled.div`
  width:100%;
  height: 140%;
  object-fit: cover;
  border-radius: 18px;
`;
const Title = styled.h1`
  margin-top: 0.3em;
	font-size: 1.4em;
	font-weight: 300;
  text-align: left;
`
const Price = styled.h2`
  margin-top: 0.3em;
	font-size: 1.4em;
	font-weight: 300;
  text-align: left;
`
const Category = styled.h2`
  margin-top: 0.3em;
	font-size: 0.8em;
	font-weight: 300;
  text-align: left;
`
const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`
const Modal = ({ open, onClose, selected }) => {
  if (!open) return null;

  console.log();

  return (
    <>
    <Overlay onClick={onClose}>
      <ModalContainer>
        <Top>
         <Images src={selected.image}/>
        </Top>
        <CloseBtn  onClick={onClose}>X</CloseBtn>
        <Content>
         <Title>{selected.title}</Title>
         <Price>{selected.price}</Price>
         <Category>{selected.description}</Category>
        </Content>

      </ModalContainer>
    </Overlay>
    </>
    );
};

export default Modal;