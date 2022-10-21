import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import Slider from "react-slick";
import Modal from '../modal/Modal'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../../styles/slides.css'

const Container = styled.div`
  	max-height: 70vh;
  	max-width: 90vw;
  	margin: auto;
  	padding-top: 10em;
  	color: #fafafa;
  	text-align: center;
  	@media all and (max-width:600px) {
    	& {
     		padding-top: 5em;
    	}
	}
	@media all and (max-width:300px) {
    	& {
     		padding-top: 3em;
    	}
  	}
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
	border: none;
	border-radius: 20px;
    width: 100%;
    height: 100%;
`;

const CardTitle = styled.h1`
	margin-top: 0.3em;
	font-size: 1.4em;
	font-weight: 300;
	text-transform: uppercase;
`;

export function Slides() {
	const [openModal, setOpenModal] = useState(false)
	const [selected, setSelected] = useState(null);
	const [slidesData, setSlidesData] = useState([]);

	function randomizer(obj) {
		var keys = Object.keys(obj);
		return obj[keys[keys.length * Math.random() << 0]];
	};

	useEffect(() => {
		axios.get('/data')
			.then((res) => {
				const sport = randomizer(res.data.sport);
				setSlidesData(slidesData => [...slidesData, sport]);
				const party = randomizer(res.data.party);
				setSlidesData(slidesData => [...slidesData, party]);
				const others = randomizer(res.data.others);
				setSlidesData(slidesData => [...slidesData, others]);
				const music = randomizer(res.data.music);
				setSlidesData(slidesData => [...slidesData, music]);
				const theater = randomizer(res.data.theater);
				setSlidesData(slidesData => [...slidesData, theater]);
				const dance = randomizer(res.data.dance);
				setSlidesData(slidesData => [...slidesData, dance]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const settings = {
		className: 'center',
		centerMode: true,
		infinite: true,
		centerPadding: '0em',
		slidesToShow: 3,
		speed: 400,
		lazyLoad: true,
		swipeToSlide: true,
		autoplay: true,
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
			<Slider {...settings} style={{ zIndex: '3'}}>
				{slidesData.map((item) => (
					<>
						<CardTop key={'CardTop' + item}>
							<Images 
								src={item.image} 
								alt={item.title} key={item.title.toString()}
								onClick={() => {setOpenModal(true); setSelected(item);}} />
						</CardTop>
						<CardTitle key={item.title.toString()}>{item.title}</CardTitle>
					</>
				))}
			</Slider>
			<Modal open={openModal} close={() => setOpenModal(false)} selected={selected} style={{ zIndex: '4' }} />
		</Container>
	);
}
