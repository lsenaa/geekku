import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img from '../../../assets/images/interiorEx.png';
import './CompanyList.css';
import { Link } from 'react-router-dom';
import { url } from 'lib/axios';

const CompanyList = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const [interiorList, setInteriorList] = useState([]);

  return (
    <div className="interiorAll">
      <div id="companyTop">시공업체</div>
      <Link to="/interiorList" id="more">
        더많은 업체보기&gt;
      </Link>

      <div className="slider-container">
        <Slider {...settings}>
          {interiorList.map((interior) => (
            <Link
              to="/profile/interior"
              className="card"
              key={interior.interiorNum}
            >
              <img style={{ width: '100%', height: '242px' }}>
                {interior.coverImage}
              </img>
              <div className="wrap-title">
                <div className="title">
                  {interior.companyName}
                  <button id="loc">{interior.possibleLocation}</button>
                </div>
                <div className="title" id="possible">
                  {interior.possiblePart === false ? (
                    <>전체시공</>
                  ) : (
                    <>전체시공/부분시공</>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CompanyList;
