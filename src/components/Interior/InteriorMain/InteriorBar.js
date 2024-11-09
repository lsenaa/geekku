import "./InteriorBar.css";
import banner from "../../../assets/images/iBar.png";

const InteriorBar = () => {
  return (
    <div className="iBanner">
      <img src={banner} alt="배너" width="1920px" height="350px" />
      <div className="bannerText">
        <div id="iText">
          카테고리를 직접 골라 인테리어 업체에게 간단한 견적을 댓글로 받고
          싶으시다면
        </div>
        <button className="btn">방꾸하기</button>
      </div>
    </div>
  );
};

export default InteriorBar;
