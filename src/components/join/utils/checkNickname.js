import axios from 'axios';

export const checkNickname = async (nickname, url) => {
  if (!nickname) {
    alert('닉네임을 입력해주세요');
    return false;
  }

  try {
    const response = await axios.get(`${url}/checkNickname`, {
      params: { nickname },
    });
    if (response.data === true) {
      alert('이미 사용중인 닉네임입니다.');
      return false;
    } else {
      alert('사용 가능한 닉네임입니다.');
      return true;
    }
  } catch (err) {
    alert('닉네임 중복 확인 실패');
    console.error(err);
    return false;
  }
};
