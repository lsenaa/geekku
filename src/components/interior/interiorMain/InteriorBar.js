import './InteriorBar.css';
import banner from '../../../assets/images/iBar.png';
import Button01 from '../../commons/button/Button01';
import { useNavigate } from 'react-router-dom';

const InteriorBar = () => {
  const navigate = useNavigate();

  return (
    <div className="iBanner">
      <img src={banner} alt="배너" width="100%" height="350px" />
      <div className="bannerText">
        <div id="iText">
          카테고리를 직접 골라 인테리어 업체에게 간단한 견적을 댓글로 받고
          싶으시다면
        </div>
        <Button01
          size="small"
          type="button"
          onClick={() => navigate('/requestInterior')}
        >
          방꾸하기
        </Button01>
      </div>
    </div>
  );
};

export default InteriorBar;
