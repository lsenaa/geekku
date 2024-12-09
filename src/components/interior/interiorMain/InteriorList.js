import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img from '../../../assets/images/interiorEx.png';
import './InteriorList.css';
import { Link } from 'react-router-dom';
import { url } from 'lib/axios';
import axios from 'axios';

const InteriorList = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const [interiorList, setInteriorList] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/interiorMain`)
      .then((res) => {
        console.log(res.data);
        setInteriorList([...res.data.interiorList]);
      })
      .catch((error) => {
        console.error(error);
        setInteriorList([]);
      });
  }, []);

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
              to={`/profile/interior/${interior.interiorNum}`}
              className="card"
              key={interior.interiorNum}
            >
              {/* <img
                src={interior.coverImage}
                style={{ width: '100%', height: '242px' }}
              /> */}
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
                  src={`data:image/png;base64, ${interior.coverImage}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div className="wrap-title">
                <div className="title">
                  {interior.companyName}
                  {Array.isArray(interior.possibleLocation)
                    ? interior.possibleLocation.map((location, index) => (
                        <button key={index} id="loc">
                          {location}
                        </button>
                      ))
                    : interior.possibleLocation
                        .split(',')
                        .map((location, index) => (
                          <button key={index} id="loc">
                            {location.trim()}
                          </button>
                        ))}
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

export default InteriorList;
