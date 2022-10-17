import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";
import Slider from "react-slick";

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

function Slides() {
	const [request, setRequest] = useState(false);
	const [slidesData, setSlidesData] = useState([]);

	function randomizer(obj) {
		var keys = Object.keys(obj);
		return obj[keys[keys.length * Math.random() << 0]];
	};

	if (!request) {
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
				setRequest(true);
				})
			.catch((err) => {
				console.log(err);
			});
		}

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
				{slidesData.map((item) => (
					<>
					<CardTop>
						<Images src={item.image} alt={item.title} />
					</CardTop>
					<CardTitle>{item.title}</CardTitle>
					</>
				))}
			</Slider>
		</Container>
	);
}
export default Slides


/*or (let count = 0; count < Object.keys(res.data).length; count++) {
	const cat = res.data[count];
	const randomKeyValue = function (cat) {
		var keys = Object.keys(cat);
		return cat[keys[keys.length * Math.random() << 0]];
	};
	console.log(res.data[randomKeyValue])*/
