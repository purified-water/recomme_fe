import { useState } from "react";
// import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [forgotPasswordInfo, setForgotPasswordInfo] = useState({ email: "", password: "" });
  const [inputErrors, setInputErrors] = useState({ email: "", password: "" });
  // const navigate = useNavigate();

  // const inputValidation = () => {
  //   let isValid = true;
  //   // Prevent override other error not showing
  //   const errors = { email: "", password: "" };

  //   if (!forgotPasswordInfo.email) {
  //     errors.email = "Email is required";
  //     isValid = false;
  //   }

  //   setInputErrors(errors);
  //   return isValid;
  // };

  // const handleForgotPassword = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!inputValidation()) return;

  //   try {
  //     const response = await authAPI.login(forgotPasswordInfo.email, forgotPasswordInfo.password);

  //     if (response.status === 200) {
  //       Cookies.set("accessToken", response.data.accessToken, {
  //         secure: process.env.NODE_ENV === "production",
  //         sameSite: "Strict",
  //         expires: 1 / 24
  //       });

  //       const decodedToken = jwtDecode<JwtPayload>(response.data.accessToken);
  //       const userId = decodedToken.sub;

  //       if (!userId) {
  //         throw new Error("User ID not found in token");
  //       }

  //       localStorage.setItem("userId", userId);
  //       navigate("/");
  //     }
  //   } catch (error: any) {
  //     // Handle Axios errors specifically
  //     if (error.response) {
  //       const errorMessage = error.response.data.message || "Invalid email or password";
  //       setInputErrors({ ...inputErrors, email: errorMessage });
  //     } else {
  //       // For other errors (network issues, etc.)
  //       setInputErrors({ ...inputErrors, email: "Something went wrong!" });
  //     }
  //     console.error("Login error", error);
  //   }
  // };

  return (
    <div className="flex items-center justify-center h-screen bg-gray5">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          {/* <img src={intellab_bottom} alt="Intellab Logo" className="h-16 mb-2" /> */}
          <h1 className="text-2xl font-bold text-appPrimary">Reset Password</h1>
        </div>

        <form
          id="forgotpassword-form"
          onSubmit={() => {
            console.log("forgot form clicked");
          }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={forgotPasswordInfo.email}
              onChange={(e) => setForgotPasswordInfo({ ...forgotPasswordInfo, email: e.target.value })}
              onFocus={() => setInputErrors({ ...inputErrors, email: "" })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-appPrimary"
            />
            {inputErrors.email && <p className="mt-2 text-sm text-appHard">{inputErrors.email}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition rounded-lg bg-appPrimary hover:opacity-90"
          >
            Confirm
          </button>
        </form>

        <div className="mt-6 text-center">
          <div className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="font-bold text-appPrimary hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
