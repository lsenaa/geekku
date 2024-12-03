import styles from './SampleDetail.module.scss';
import cover from '../../../assets/images/cover.png';
import icon from '../../../assets/images/usericon.png';
import houseType from '../../../assets/images/houseType.png';
import size from '../../../assets/images/size.png';
import possible from '../../../assets/images/possible.png';
import area from '../../../assets/images/area.png';
import Button01 from 'components/commons/button/Button01';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { url } from 'lib/axios';
import { useAtomValue } from 'jotai';
import { tokenAtom, userAtom } from 'store/atoms';

const SampleDetail = () => {
  const [sampleInfo, setSampleInfo] = useState({});
  const { num } = useParams();
  const user = useAtomValue(userAtom);
  const token = useAtomValue(tokenAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const param = { id: user.userId, num: num };
    axios
      .post(`${url}/sampleDetail`, param)
      .then((res) => {
        console.log(res.data);
        setSampleInfo({ ...res.data.sampleInfo });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <div>
      <div className={styles.coverImgWrap}>
        <img
          src={`${url}/sampleImage/${sampleInfo.coverImage}`}
          alt="커버사진"
        />
      </div>
      <div className={styles.all}>
        <div className={styles.title}>{sampleInfo.title}</div>
        <div className={styles.contentWrap}>
          <div className={styles.user}>
            <img
              src={user.profileImage}
              alt="유저아이콘"
              style={{ height: '40px' }}
            />
            <div className={styles.nameInfo}>
              <span id={styles.name}>{sampleInfo.companyName}</span>
              <span id={styles.info}>{sampleInfo.intro}</span>
            </div>
          </div>
          <div className={styles.type}>
            <span>
              <img src={houseType} alt="주거형태" /> {sampleInfo.type}
            </span>
            <span>
              <img src={size} alt="평수" /> {sampleInfo.size}
            </span>
            <span>
              <img src={possible} alt="스타일" /> {sampleInfo.style}
            </span>
            <span>
              <img src={area} alt="지역" /> {sampleInfo.location}
            </span>
          </div>
          <div className={styles.content}>{sampleInfo.content}</div>
        </div>
        <Button01 size="small" onClick={() => navigate('/sampleList')}>
          목록으로
        </Button01>
      </div>
    </div>
  );
};

export default SampleDetail;
