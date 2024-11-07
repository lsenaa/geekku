import React from "react";
import Slider from "react-slick";
import img from '../../../assets/images/interiorEx.png'
import './CompanyList.css';


const CompanyList = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  return (
    <div className="interiorAll">
    <h2>시공업체</h2>
    <h5>더많은 업체보기</h5>

    <div className="slider-container">
      <Slider {...settings}>
        <div className="card">
          <img src={img} style={{width:"384px",height:"242px"}}/>
          <>
            <h4>코스타 인테리어</h4>
            <h5>전체시공/부분시공</h5>
          </>
        </div>
        <div className="card">
          <img src={img} style={{width:"384px",height:"242px"}}/>
          <>
            <h4>코스타 인테리어</h4>
            <h5>전체시공/부분시공</h5>
          </>
        </div>
        <div className="card">
          <img src={img} style={{width:"384px",height:"242px"}}/>
          <>
            <h4>코스타 인테리어</h4>
            <h5>전체시공/부분시공</h5>
          </>
          </div>
        <div className="card">
          <img src={img} style={{width:"384px",height:"242px"}}/>
          <>
            <h4>코스타 인테리어</h4>
            <h5>전체시공/부분시공</h5>
          </>
        </div>
        <div className="card">
          <img src={img} style={{width:"384px",height:"242px"}}/>
          <>
            <h4>코스타 인테리어</h4>
            <h5>전체시공/부분시공</h5>
          </>
        </div>
        <div className="card">
          <img src={img} style={{width:"384px",height:"242px"}}/>
          <>
            <h4>코스타 인테리어</h4>
            <h5>전체시공/부분시공</h5>
          </>
        </div>
        <div className="card">
          <img src={img} style={{width:"384px",height:"242px"}}/>
          <>
            <h4>코스타 인테리어</h4>
            <h5>전체시공/부분시공</h5>
          </>
        </div>
        <div className="card">
          <img src={img} style={{width:"384px",height:"242px"}}/>
          <>
            <h4>코스타 인테리어</h4>
            <h5>전체시공/부분시공</h5>
          </>
        </div>
        <div className="card">
          <img src={img} style={{width:"384px",height:"242px"}}/>
          <>
            <h4>코스타 인테리어</h4>
            <h5>전체시공/부분시공</h5>
          </>
        </div>
      </Slider>
    </div>
    </div>
  );
}

export default CompanyList;
