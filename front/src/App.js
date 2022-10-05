import './App.css';
import styled from 'styled-components';
import React from 'react';
import { NavBar } from './components/header/NavBar';
import { SearchBar } from './components/body/searchBar/SearchBar';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { dataDigitalBestSeller } from './data';



const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

function App() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <React.Fragment>
        <NavBar/>
      </React.Fragment>
      <AppContainer>
        <SearchBar />
      </AppContainer>
      <Slider {...settings}>
        {dataDigitalBestSeller.map((item) =>(
          <div className='card'>
            <div className='card-top'>
              <img src={item.linkImg} alt={item.title} />
              <h1>{item.title}</h1>
            </div>
            <div className='card-bottom'>
              <h3>{item.price}</h3>
              <span className="category">{item.category}</span>
            </div>
          </div>
        ))}
      </Slider>
    
    </div>
  );
}

export default App;