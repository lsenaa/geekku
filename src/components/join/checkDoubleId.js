import axios from 'axios';

export const checkDoubleId = async (username, url) => {
  if (!username) {
    alert('아이디를 입력해주세요');
    return false;
  }

  try {
    const response = await axios.get(`${url}/checkDoubleId`, {
      params: { username },
    });
    if (response.data === true) {
      alert('이미 사용중인 아이디입니다.');
      return false;
    } else {
      alert('사용 가능한 아이디입니다.');
      return true;
    }
  } catch (err) {
    alert('아이디 중복 확인 실패');
    console.error(err);
    return false;
  }
};
