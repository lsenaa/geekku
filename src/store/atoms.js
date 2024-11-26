import { atomWithStorage, createJSONStorage } from 'jotai/utils';

// export const initUser = {
//   id: "",
//   password: "",
//   name: "",
//   nickname: "",
//   email: "",
//   address: "",
//   profileImage: "",
//   profileImageStr: ""
// }

// export const userAtom = atomWithStorage("user", initUser, createJSONStorage(() => sessionStorage));

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

export const userNameAtom = atomWithStorage(
  'username',
  '',
  createJSONStorage(() => sessionStorage)
);
