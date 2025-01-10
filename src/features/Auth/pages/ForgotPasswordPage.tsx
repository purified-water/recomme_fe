import { useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/lib/api";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "rocketicons/md";
import { useEffect } from "react";

export const ForgotPasswordPage = () => {
  const { toast } = useToast();
  const [forgotPasswordInfo, setForgotPasswordInfo] = useState({ email: "", newPassword: "", otp: "" });
  const [inputErrors, setInputErrors] = useState({ email: "", newPassword: "", otp: "" });
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const inputValidation = () => {
    let isValid = true;
    const errors = { email: "", newPassword: "", otp: "" };

    if (!forgotPasswordInfo.email) {
      errors.email = "Email is required";
      isValid = false;
    }

    if (!forgotPasswordInfo.newPassword) {
      errors.newPassword = "New Password is required";
      isValid = false;
    }

    if (!forgotPasswordInfo.otp) {
      errors.otp = "OTP is required";
      isValid = false;
    }

    setInputErrors(errors);
    return isValid;
  };

  const sendOTPRequest = async () => {
    try {
      if (!forgotPasswordInfo.email) {
        toast({ description: "Please enter your email first." });
        return;
      }
      await authAPI.generateOTP(forgotPasswordInfo.email);
      setCountdown(45);
      toast({ description: "OTP sent successfully!" });
    } catch (error) {
      alert("Error sending OTP.");
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValidation()) return;

    try {
      const response = await authAPI.forgotPassword(
        forgotPasswordInfo.newPassword,
        forgotPasswordInfo.email,
        forgotPasswordInfo.otp
      );

      const data = await response;
      if (data.status === 200) {
        toast({
          title: "Password reset successfully!",
          description: "Navigating to login page..."
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        toast({
          title: "Error",
          description: data.data.message
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not reset password. Please try again."
      });
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray5">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-appPrimary">Reset Password</h1>
        </div>

        <form id="forgotpassword-form" onSubmit={handleForgotPassword}>
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

          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-bold text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                value={forgotPasswordInfo.newPassword}
                onChange={(e) => setForgotPasswordInfo({ ...forgotPasswordInfo, newPassword: e.target.value })}
                onFocus={() => setInputErrors({ ...inputErrors, newPassword: "" })}
                placeholder="Enter your new password"
                className="w-full px-4 py-2 mt-1 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-appPrimary"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 flex items-center justify-center text-gray3 right-2 top-1 focus:outline-none"
              >
                {showPassword ? (
                  <MdOutlineVisibilityOff className="icon-lg" />
                ) : (
                  <MdOutlineVisibility className="icon-lg" />
                )}
              </button>
              {inputErrors.newPassword && <p className="mt-2 text-sm text-appHard">{inputErrors.newPassword}</p>}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="otp" className="block mb-1 text-sm font-bold text-gray-700">
              Enter OTP
            </label>
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={forgotPasswordInfo.otp}
              onChange={(otp) => setForgotPasswordInfo({ ...forgotPasswordInfo, otp })}
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            {inputErrors.otp && <p className="mt-2 text-sm text-appHard">{inputErrors.otp}</p>}
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={sendOTPRequest}
              disabled={countdown > 0}
              className={`w-full py-2 font-semibold text-white transition rounded-lg ${countdown > 0 ? "bg-gray-400" : "bg-appPrimary hover:opacity-90"}`}
            >
              {countdown > 0 ? `Send OTP (${countdown}s)` : "Send OTP"}
            </button>

            <button
              type="submit"
              className="w-full py-2 font-semibold text-white transition rounded-lg bg-appPrimary hover:opacity-90"
            >
              Confirm
            </button>
          </div>
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
