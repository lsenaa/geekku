import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img from '../../../assets/images/interiorEx.png';
import './Sample.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sample = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const [sampleList, setSampleList] = useState([]);

  const list = () => {
    const url = 'http://localhost:3000';
    const apiUrl = `${url}/interior`;
    console.log('API URL:', apiUrl);

    axios
      .get(apiUrl)
      .then((res) => {
        console.log('API Response:', res.data); // 응답 확인
        // 응답이 배열인지 확인
        if (Array.isArray(res.data)) {
          setSampleList(res.data);
        } else {
          console.error('Expected an array but got:', res.data);
          setSampleList([]); // 배열이 아닐 경우 빈 배열로 설정
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setSampleList([]); // 에러 발생 시 빈 배열로 설정
      });
  };

  useEffect(() => {
    console.log('list: ');
    list();
  }, []);

  return (
    <div className="interiorAll" id="sampleBottom">
      <div id="sampleTop">시공사례</div>
      <Link to="/sampleList" id="more">
        더많은 사례보기&gt;
      </Link>

      <div className="slider-container">
        {sampleList.length > 0 ? (
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
        ) : (
          <div>리스트가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default Sample;
