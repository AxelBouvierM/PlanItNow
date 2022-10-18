import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { dataDigitalBestSeller } from './data';
import styled from "styled-components";
import React, { useState } from 'react';
import Modal from '../Modal/Modal.js'
import '../../../styles/slides.css'
import '../Modal/Modal.css'

const Container = styled.div`
  max-height: 70vh;
  max-width: 90vw;
  margin: auto;
  padding-top: 10em;
  color: #fafafa;
  text-align: center;
`;

const CardTop = styled.div`
    width: 100%;
    height: 15em;
    object-fit: cover;
	border: none;
	border-radius: 20px;
	cursor:pointer;
`;

const Images = styled.img`
	display: flex;
	border: 1px solid #fafafa;
	border-radius: 20px;
    width: 100%;
    height: 100%;
`;

const CardTitle = styled.h1`
	margin-top: 0.3em;
	font-size: 1.4em;
	font-weight: 300;
`;

function Slides() {
    const [openModal, setOpenModal] = useState(false)
	const [selected, setSelected] = useState(null);
	const [slideIndex, setSlideIndex] = useState(0);

	const settings = {
		focusOnSelect: true,
		className: 'center',
		centerMode: true,
		infinite: true,
		centerPadding: '0em',
		slidesToShow: 3,
		speed: 400,
		lazyLoad: true,
		swipeToSlide: true,
		beforeChange: (current, next)=>setSlideIndex(next),
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
					arrows: false,
				},
			},
			{
				breakpoint: 1279,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					centerMode: true,
					arrows: false,
				},
			},
			{ 
				breakpoint: 1280,
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
			<Slider {...settings} >
				{dataDigitalBestSeller.map((item, index) => (
				<div key={index}>
					<CardTop className={index === slideIndex} key={index}>
						<Images src={item.linkImg} alt={item.title} onClick={() => {
							setOpenModal(true);
							setSelected(item);
						}}
						/>

					</CardTop>
					<CardTitle>{item.title}</CardTitle>
				</div>
				
				))}
			</Slider>
			<Modal open={openModal} onClose={() => setOpenModal(false)} selected={selected} />
		</Container>
	);
}


export default Slides