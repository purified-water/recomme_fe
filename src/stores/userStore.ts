import { create } from "zustand";

type UserStore = {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
  phoneNumber: string;
  photoUrl: string;
}

export const useUserStore = create<UserStore>(() => ({
  uid: "",
  email: "",
  displayName: "",
  emailVerified: false,
  phoneNumber: "",
  photoUrl: "",
}));