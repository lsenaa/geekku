import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export const initUser = {
  userId: '',
  username: '',
  name: '',
  phone: '',
  email: '',
  nickname: '',
  profileImage: '',
  role: '',
  provider: '',
  providerId: '',
  socialProfileImage: '',
};

export const userAtom = atomWithStorage(
  'user',
  initUser,
  createJSONStorage(() => sessionStorage)
);

export const tokenAtom = atomWithStorage(
  'token',
  '',
  createJSONStorage(() => sessionStorage)
);
