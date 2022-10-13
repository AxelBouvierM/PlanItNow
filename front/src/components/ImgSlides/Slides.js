import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { dataDigitalBestSeller } from './data';
import {useState} from "react"
import styled from "styled-components";

const Container = styled.div`
  max-height: 500px;
  max-width: 700px;
  justify-content: center;
  margin: auto;
  padding-top: 40px;
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


function Slides() {

  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    focusOnSelect: true,
    className: "center",
    centerMode: true,
    infinite: true,
    lazyLoad:true,
    centerPadding: "50px",
    slidesToShow: 3,
    speed: 300,
    beforeChange: (current, next) => setImageIndex(next),
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
            <div className={idx===imageIndex ? 'card activeCard' : 'card'}>
            <CardTop>
                <img src={item.linkImg} alt={item.title} />
                <CardToph1>{item.title}</CardToph1>
            </CardTop>
            <CardBottom>
                <h3>{item.price}</h3>
                <Category>{item.category}</Category>
            </CardBottom>
              </div>
            ))}
          </Slider>
      </Container>
    );
}
export default Slides