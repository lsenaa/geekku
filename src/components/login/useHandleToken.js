import { useEffect } from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UseHandleToken = ({ url, setToken, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    if (token) {
      setToken(token);
      //console.log('token:', token);

      // 사용자 정보 가져오기
      axios
        .get(`${url}/user/userInfo`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          //console.log('User info received:', res.data);
          setUser(res.data);
          navigate('/');
        })
        .catch((err) => {
          console.error('Failed to fetch user info:', err);
          Modal.error({
            content: '사용자 정보를 가져오는 데 실패했습니다.',
          });
        });
    } else {
      console.error('No token found in URL');
    }
  }, [navigate, setToken, setUser, url]);
};

export default UseHandleToken;
