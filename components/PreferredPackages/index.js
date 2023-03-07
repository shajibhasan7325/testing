import React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import Image from 'next/image';
import girl from '../../assets/img/girl.jpg';

function CustomNextArrow(props) {
  const { className, onClick } = props;
  return <div className={`${className} bg-white`} onClick={onClick}></div>;
}

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} onClick={onClick} />;
}

const PreferredPackages = () => {
  const settings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // autoplay: true,
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
      <hr className="hr-white" />
      <Container className="preferred-packages">
        <div className="title-content">
          <h2
            className="title font-familt-jost"
            style={{ width: '100%', textAlign: 'center' }}
          >
            Preferred Packages
          </h2>
        </div>
        <Slider {...settings}>
          {[1, 2, 3, 4, 5, 6].map(() => (
            <div
              className="package-item"
              style={{
                height: '100%',
              }}
            >
              <div
                className="mobile-product-info-wrapper"
                style={{ width: '15rem' }}
              >
                <Card className="border-0 rounded-0 package-info card">
                  <Card.Header className="date text-center bg-white card-header">
                    Glam Code Gift
                  </Card.Header>
                  <Card.Body className="card-body p-2 p-md-4">
                    <div className="d-flex justify-content-around">
                      <Card.Text className="fw-semibold card-text mb-2 mb-md-3">
                        ₹ 2665
                      </Card.Text>
                      <Card.Text className="fw-semibold card-text mb-2 mb-md-3">
                        205 MINS
                      </Card.Text>
                    </div>
                    <div className="d-flex justify-content-around align-items-center">
                      <h5 className="fw-semibold extra-small-text">40% OFF</h5>
                      <h5 className="fw-semibold save-text rounded-1">
                        Save ₹ 1066
                      </h5>
                      <h5 className="fw-semibold extra-small-text">₹ 1599</h5>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white py-md-3 d-flex justify-content-between justify-content-md-around card-footer">
                    <Button
                      type="button"
                      className="extra-small-text package-btn border-0 me-2 py-1 py-md-2 mb-md-1 mb-xl-0 btn btn-primary"
                    >
                      Add to card
                    </Button>
                    <Button
                      type="button"
                      className="extra-small-text package-btn border-0 py-md-2 btn btn-primary"
                    >
                      View Details
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
              {/* <a href="#" >
              <img
                height=""
                width="100%"
                alt="Best home salon services in Lucknow"
                src="https://admin.glamcode.in/user-uploads/service/253/12541ee64dc3df644d1a41853b4f4f7c.png.webp" />
            </a> */}
              <img
                src={girl.src}
                width={238}
                height={200}
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          ))}
        </Slider>
      </Container>
    </>
  );
};

export default PreferredPackages;
