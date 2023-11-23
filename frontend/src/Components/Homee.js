import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <img
            src="https://via.placeholder.com/1920x1080"
            alt="Slide 1"
            style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/1920x1080"
            alt="Slide 2"
            style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/1920x1080"
            alt="Slide 3"
            style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
          />
        </div>
      </Slider>
    </div>
  );
};

export default Home;
