import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { dataDigitalBestSeller } from './data';
import {useState} from "react"
/*import {FaArrowRight, FaArrowLeft} from "react-icons/fa"*/


function Slides() {

  /*const NextArrow = ({onClick}) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight/>
      </div>
    )
  }

  const PrevArrow = ({onClick}) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft/>
      </div>
    )
  }*/

  const [imageIndex, setImageIndex] = useState(0);



  const settings = {
    focusOnSelect: true,
    className: "center",
    centerMode: true,
    infinite: true,
    lazyLoad:true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 300,
    /*nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,*/
    beforeChange: (current, next) => setImageIndex(next),
  };
    return (
      <div className="container">
        <Slider {...settings}>
        {dataDigitalBestSeller.map((item, idx) =>(
            <div className={idx===imageIndex ? 'card activeCard' : 'card'}>
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
export default Slides