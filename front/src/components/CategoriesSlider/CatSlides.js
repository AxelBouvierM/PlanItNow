import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";
import './CatSlides.css';
import { dataDigitalBestSeller } from '../ImgSlides/data';

const Container = styled.div`
  max-width: 84em;
  max-height: 80px;
  justify-content: center;
  margin: auto;
`;

const Card = styled.div`
  transform: scale(0.6);
  border: 1px solid #fff;
  background: white;
  border-radius:20px;
  overflow: hidden;
  height: 22em;
  max-width: 15rem;
  color: black;
  cursor: pointer;
  margin: 60px auto;
`;

const CardToph1 = styled.h1`
  font-size: 1rem;
  margin: 10px;
  margin-top: 10px;
`;

const Category = styled.span`
  position: relative;
  &:before {
    content: '';
    background: rgb(255, 61, 61);
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    right: 0;
    height: 2px;
  }
`;

const CardBottom = styled.div`
  margin: 10px;
  margin-top: 70px;
`;

const CardTop = styled.div`
    width: 100%;
    height: 180px;
    object-fit: cover;
    background: white;
`;

function CatSlides() {
    const settings = {
        className: "center",
        focusOnSelect: true,
        centerMode: true,
        infinite: true,
        centerPadding: "50px",
        slidesToShow: 5,
        speed: 500,
        responsive: [
          {
            breakpoint: 281,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
            },
          },
          {
            breakpoint: 376,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
            },
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              centerMode: true,
            },
          },
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              centerMode: true,
            },
          },
        ],
      };
      return (
        <Container>
          <Slider {...settings}>
          {dataDigitalBestSeller.map((item, idx) =>(
            <Card>
            <CardTop>
                <img src={item.linkImg} alt={item.title} />
                <CardToph1>{item.title}</CardToph1>
            </CardTop>
            <CardBottom>
                <h3>{item.price}</h3>
                <Category>{item.category}</Category>
            </CardBottom>
              </Card>
            ))}
          </Slider>
        </Container>
      );
}
export default CatSlides