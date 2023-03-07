import React from 'react';
import { Card, Container } from 'react-bootstrap';
import Slider from 'react-slick';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import girl from '../../assets/img/girl.jpg';
// import Image from 'next/image';

function CustomNextArrow(props) {
  const { className, onClick } = props;
  return <div className={`${className}`} onClick={onClick}></div>;
}

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

const ReferAndEarn = () => {
  const settings = {
    dots: false,
    infinite: true,
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
          initialSlide: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          variableWidth: true,
        },
      },
    ],
  };

  return (
    <div className="refer-earn mx-2 mx-md-4 mx-lg-5">
      <Slider {...settings}>
        {[1, 2, 3, 4, 5, 6].map(() => (
          <Card className="border-0 rounded-3 px-2 card refer-earn-img relative">
            <Link href="/">
              <img
                src={girl.src}
                width="100%"
                height="100%"
                className="rounded-3"
                style={{ objectFit: 'cover' }}
              />
              <br />
              <h6
                className="position-absolute top-0 left-0 p-2 bg-primary text-white"
                style={{ borderRadius: '6px 0 0 0' }}
              >
                40% Off
              </h6>
            </Link>
          </Card>
        ))}
      </Slider>
    </div>
  );
};

export default ReferAndEarn;
