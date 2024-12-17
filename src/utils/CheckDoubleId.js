import axios from 'axios';

export const CheckDoubleId = async (username, url, messageApi) => {
  if (!username) {
    messageApi.open({
      type: 'info',
      content: '아이디를 입력해주세요.',
    });
    return false;
  }

  try {
    const response = await axios.get(`${url}/checkDoubleId`, {
      params: { username },
    });
    if (response.data === true) {
      messageApi.open({
        type: 'error',
        content: '이미 사용중인 아이디입니다.',
      });
      return false;
    } else {
      messageApi.open({
        type: 'success',
        content: '사용 가능한 아이디입니다.',
      });
      return true;
    }
  } catch (err) {
    messageApi.open({
      type: 'error',
      content: '아이디 중복 확인 실패',
    });
    console.error(err);
    return false;
  }
};
