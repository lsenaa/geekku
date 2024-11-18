import styles from './SampleDetail.module.scss';
import cover from '../../../assets/images/cover.png';
import icon from '../../../assets/images/usericon.png';

const SampleDetail = () => {
  return (
    <div>
      <img src={cover} alt="커버사진" width="100%" height="595px" />
      <div>
        <div>허름했던 농가주택을 살기 좋은 집으로 대변신 !</div>
        <div>
          <img src={icon} alt="유저아이콘" />
          <span>
            코스타 인테리어
            <br />
            모던 is done..
          </span>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SampleDetail;
