import { apiClient } from "./apiClient";

export const authAPI = {
  login: async (email: string, password: string) => {
    return apiClient.post("/api/auth/login", { email, password });
  },
  signUp: async (displayName: string, email: string, password: string) => {
    return apiClient.post("/api/auth/register", { displayName, email, password });
  },
  continueWithGoogle: async (idToken: string) => {
    return apiClient.post("api/auth/login/google", { idToken });
  },
  forgotPassword: async (newPassword: string, email: string, otpCode: string) => {
    return apiClient.post("api/auth/forgotPassword", { newPassword, email, otpCode });
  },
  confirmOTP: async (email: string, otpCode: string) => {
    return apiClient.post("api/auth/activateAccount", { email, otpCode });
  },
  generateOTP: async (email: string) => {
    return apiClient.post("api/otp/generate", { email });
  }
};
