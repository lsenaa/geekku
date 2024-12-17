import axios from 'axios';

export const url = 'https://geekku.shop';

export const axiosInToken = (token) =>
  axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {
      Authorization: token,
    },
    withCredentials: true,
  });
