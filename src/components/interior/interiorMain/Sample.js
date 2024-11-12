import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img from '../../../assets/images/interiorEx.png';
import './Sample.css';

const Sample = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div className="interiorAll" id="sampleBottom">
      <div id="sampleTop">시공사례</div>
      <div id="more">더많은 사례보기&gt;</div>

      <div className="slider-container">
        <Slider {...settings}>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                인천시 청라동 청라자이 아파트 37평 인테리어
              </div>
              <div className="title" id="interiorName">
                코스타 인테리어
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                인천시 청라동 청라자이 아파트 37평 인테리어
              </div>
              <div className="title" id="interiorName">
                코스타 인테리어
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                인천시 청라동 청라자이 아파트 37평 인테리어
              </div>
              <div className="title" id="interiorName">
                코스타 인테리어
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                인천시 청라동 청라자이 아파트 37평 인테리어
              </div>
              <div className="title" id="interiorName">
                코스타 인테리어
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                인천시 청라동 청라자이 아파트 37평 인테리어
              </div>
              <div className="title" id="interiorName">
                코스타 인테리어
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                인천시 청라동 청라자이 아파트 37평 인테리어
              </div>
              <div className="title" id="interiorName">
                코스타 인테리어
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                인천시 청라동 청라자이 아파트 37평 인테리어
              </div>
              <div className="title" id="interiorName">
                코스타 인테리어
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                인천시 청라동 청라자이 아파트 37평 인테리어
              </div>
              <div className="title" id="interiorName">
                코스타 인테리어
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                인천시 청라동 청라자이 아파트 37평 인테리어
              </div>
              <div className="title" id="interiorName">
                코스타 인테리어
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Sample;
