import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import { CategoriesData } from './CategoriesData';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../../styles/slides.css'

const Container = styled.div`
	position: relative;
	align-items: center;
	justify-content: center;
  	max-height: 70vh;
  	max-width: 90vw;
	padding-top: 2em;
  	margin: auto;
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

function Slides() {
	const [redirect, setRedirect] = useState(false);
	const [redirectTo, setRedirectTo] = useState('');
	const navigate = useNavigate();

	const categories = ['musica', 'restaurant', 'teatro', 'deporte', 'danza', 'otros', 
	'cine', 'fiesta', 'cerveceria', 'cafeteria', 'museo', 'entretenimiento'];
	
	useEffect(() => {
		CategoriesData.sort(function () {
			return Math.random() - 0.5;
		});
	});

	const settings = {
		className: 'center',
		centerMode: true,
		infinite: true,
		centerPadding: '0em',
		slidesToShow: 3,
		speed: 400,
		lazyLoad: true,
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
	
	if (redirect && categories.includes(redirectTo)) navigate('/categorias/' + redirectTo);

	return (
		<Container>
			<Slider {...settings} style={{ zIndex: '3'}}>
				{CategoriesData.map((item) => (
					<>
						<CardTop key={'CardTop' + item}>
							<Images 
								src={item.image} 
								alt={item.title} key={item.image.toString()}
								onClick={() => { setRedirectTo(item.title); setRedirect(true) }} />
						</CardTop>
						<CardTitle key={item.title.toString()}>{item.title}</CardTitle>
					</>
				))}
			</Slider>
		</Container>
	);
}
export default Slides
