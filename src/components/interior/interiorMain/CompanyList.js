import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img from '../../../assets/images/interiorEx.png';
import './CompanyList.css';
import { Link } from 'react-router-dom';

const CompanyList = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div className="interiorAll">
      <div id="companyTop">시공업체</div>
      <Link to="/interiorList" id="more">
        더많은 업체보기&gt;
      </Link>

      <div className="slider-container">
        <Slider {...settings}>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                코스타 인테리어
                <button id="loc">경상도</button>
              </div>
              <div className="title" id="possible">
                전체시공/부분시공
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                코스타 인테리어
                <button id="loc">경상도</button>
              </div>
              <div className="title" id="possible">
                전체시공/부분시공
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                코스타 인테리어
                <button id="loc">경상도</button>
              </div>
              <div className="title" id="possible">
                전체시공/부분시공
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                코스타 인테리어
                <button id="loc">경상도</button>
              </div>
              <div className="title" id="possible">
                전체시공/부분시공
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                코스타 인테리어
                <button id="loc">경상도</button>
              </div>
              <div className="title" id="possible">
                전체시공/부분시공
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                코스타 인테리어
                <button id="loc">경상도</button>
              </div>
              <div className="title" id="possible">
                전체시공/부분시공
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                코스타 인테리어
                <button id="loc">경상도</button>
              </div>
              <div className="title" id="possible">
                전체시공/부분시공
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                코스타 인테리어
                <button id="loc">경상도</button>
              </div>
              <div className="title" id="possible">
                전체시공/부분시공
              </div>
            </div>
          </div>
          <div className="card">
            <img src={img} style={{ width: '100%', height: '242px' }} />
            <div className="wrap-title">
              <div className="title">
                코스타 인테리어
                <button id="loc">경상도</button>
              </div>
              <div className="title" id="possible">
                전체시공/부분시공
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default CompanyList;
