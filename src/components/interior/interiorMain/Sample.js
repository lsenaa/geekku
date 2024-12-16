import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Sample.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { url } from 'lib/axios';
import './Sample.css';

const Sample = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const [sampleList, setSampleList] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/interiorMain`)
      .then((res) => {
        //console.log(res.data);
        setSampleList([...res.data.sampleList]);
      })
      .catch((error) => {
        console.error(error);
        setSampleList([]);
      });
  }, []);

  return (
    <div className="interiorAll" id="sampleBottom">
      <div id="sampleTop">시공사례</div>
      <Link to="/sampleList" id="more">
        더많은 사례보기&gt;
      </Link>

      <div className="slider-container">
        <Slider {...settings}>
          {sampleList.map((sample) => (
            <Link
              to={`/sampleDetail/${sample.sampleNum}`}
              className="card"
              key={sample.sampleNum}
            >
              <div
                style={{
                  width: '100%',
                  height: '242px',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={`${url}/sampleImage/${sample.coverImage}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="wrap-title">
                <div className="sampleTitle" id="sampleTitle">
                  {sample.title}
                </div>
                <div className="title" id="interiorName">
                  {sample.companyName}
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Sample;
