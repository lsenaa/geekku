import axios from 'axios';
import { Modal } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UseHandleTokens = ({ url, setToken, setUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    if (token) {
      setToken(token);

      // 사용자 정보 가져오기
      axios
        .get(`${url}/user/userInfo`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          console.log('유저정보 받아옴:', res.data);
          setUser(res.data);
          navigate('/');
        })
        .catch((err) => {
          console.error('유저정보 불러오기 실패:', err);
          Modal.error({
            content: '사용자 정보를 가져오는 데 실패했습니다.',
          });
        });
    } else {
      console.error('토큰없음');
    }
  }, [navigate, setToken, setUser, url]);
};

export default UseHandleTokens;
