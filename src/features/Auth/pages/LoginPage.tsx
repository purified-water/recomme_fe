import { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "rocketicons/md";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/lib/api";
import LoginGoogle from "@/features/Auth/components/LoginGoogle";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useUserStore } from "@/stores/userStore";
import { userAPI } from "@/lib/api/userApi";

export const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [inputErrors, setInputErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputValidation = () => {
    let isValid = true;
    // Prevent override other error not showing
    const errors = { email: "", password: "" };

    if (!loginInfo.email) {
      errors.email = "Email is required";
      isValid = false;
    }
    if (!loginInfo.password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setInputErrors(errors);
    return isValid;
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      const response = await userAPI.getProfile(userId);
      const userData = response.data;
      let { email, displayName, phoneNumber, photoUrl } = userData;

      if (!displayName) {
        displayName = email.split("@")[0];
      }

      useUserStore.setState({
        email,
        displayName,
        phoneNumber,
        photoUrl: photoUrl
      });
    } catch (error) {
      console.error("Fetch user profile error", error);
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValidation()) return;

    try {
      const response = await authAPI.login(loginInfo.email, loginInfo.password);

      if (response.status === 200) {
        Cookies.set("accessToken", response.data.accessToken, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          expires: 1 / 24
        });

        const decodedToken = jwtDecode<JwtPayload>(response.data.accessToken);
        const userId = decodedToken.sub;

        if (!userId) {
          throw new Error("User ID not found in token");
        }
        // Fetch user info and store in global state
        await fetchUserProfile(userId);

        localStorage.setItem("userId", userId);
        navigate("/");
      }
    } catch (error: any) {
      // Handle Axios errors specifically
      if (error.response) {
        const errorMessage = error.response.data.message || "Invalid email or password";
        setInputErrors({ ...inputErrors, email: errorMessage });
      } else {
        // For other errors (network issues, etc.)
        setInputErrors({ ...inputErrors, email: "Something went wrong!" });
      }
      console.error("Login error", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray5">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          {/* <img src={intellab_bottom} alt="Intellab Logo" className="h-16 mb-2" /> */}
          <h1 className="text-2xl font-bold text-appPrimary">Log In</h1>
        </div>

        <form id="login-form" onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={loginInfo.email}
              onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
              onFocus={() => setInputErrors({ ...inputErrors, email: "" })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-appPrimary"
            />
            {inputErrors.email && <p className="mt-2 text-sm text-appHard">{inputErrors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={loginInfo.password}
                onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                onFocus={() => setInputErrors({ ...inputErrors, password: "" })}
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-1 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-appPrimary"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 items-center justify-center text-gray3 right-2 top-1 focus:outline-none"
              >
                {showPassword ? (
                  <MdOutlineVisibilityOff className="icon-lg" />
                ) : (
                  <MdOutlineVisibility className="icon-lg" />
                )}
              </button>
            </div>
            {inputErrors.password && <p className="mt-2 text-sm text-appHard">{inputErrors.password}</p>}

            <div className="mt-2 text-right">
              <a href="/forgot-password" className="text-sm text-appPrimary hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition rounded-lg bg-appPrimary hover:opacity-90"
          >
            Log In
          </button>
        </form>

        <LoginGoogle />

        <div className="mt-6 text-center">
          <div className="text-sm">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="font-bold text-appPrimary hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
