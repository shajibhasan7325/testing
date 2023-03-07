import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card2 from './Card2';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function CustomNextArrow(props) {
  const { className, onClick } = props;
  return <div className={`${className} bg-white`} onClick={onClick}></div>;
}

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

const Index = () => {
  const settings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="testimonial">
        <div className="title-content text-center my-5">
          <h2
            className="title font-familt-jost"
            style={{ width: '100%', textAlign: 'center' }}
          >
            Customer Testimonials
          </h2>
        </div>
        <Slider {...settings}>
          {[1, 2, 3, 4, 5].map((card) => (
            <Card2 />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Index;
