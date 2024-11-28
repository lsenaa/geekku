import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img from '../../../assets/images/interiorEx.png';
import './Sample.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { url } from 'lib/axios';

const Sample = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const [sampleList, setSampleList] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/interiorMain`)
      .then((res) => {
        console.log(res.data);
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
              <img
                src={sample.coverImage}
                style={{ width: '100%', height: '242px' }}
              />
              <div className="wrap-title">
                <div className="title">{sample.intro}</div>
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
