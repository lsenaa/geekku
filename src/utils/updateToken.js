export const updateToken = (authorization, setToken) => {
  if (authorization) {
    setToken((prevToken) => {
      if (authorization !== prevToken) {
        console.log('새로운 토큰으로 갱신됨');
      } else {
        console.log('기존 토큰 유지');
      }
      return authorization || prevToken;
    });
  } else {
    console.log('응답 헤더에 authorization필드가 없습니다.');
  }
};
