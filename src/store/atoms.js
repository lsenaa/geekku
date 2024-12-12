import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export const initUser = {
  userId: '',
  username: '',
  password: '',
  name: '',
  phone: '',
  email: '',
  nickname: '',
  role: '',
  provider: '',
  providerId: '',
  profileImage: '',
  profileImageStr: '',
  socialProfileImage: '',
  createdAt: '',
  type: '',

  companyId: '',
  companyName: '',
  companyAddress: '',
  companyNumber: '',
  ceoName: '',
  estateNumber: '',
  certificationImagePath: '',
  regStatus: false,
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

export const fcmTokenAtom = atomWithStorage(
  'fcmtoken',
  '',
  createJSONStorage(() => sessionStorage)
);

export const alarmsAtom = atomWithStorage(
  'alarms',
  [],
  createJSONStorage(() => sessionStorage)
);
