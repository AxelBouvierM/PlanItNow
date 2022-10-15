import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { dataDigitalBestSeller } from './data';
import styled from "styled-components";

const Container = styled.div`
  max-height: 70vh;
  max-width: 90vw;
  margin: auto;
  padding-top: 7em;
  text-align: center;
  color: #fafafa;
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
					arrows: true,
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
				{dataDigitalBestSeller.map((item) => (
					<>
					<CardTop>
						<Images src={item.linkImg} alt={item.title} />
					</CardTop>
					<CardTitle>{item.title}</CardTitle>
					</>
				))}
			</Slider>
		</Container>
	);
}
export default Slides
