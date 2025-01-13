import { useState, useEffect } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authAPI } from "@/lib/api";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const ActivateAccountPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [inputErrors, setInputErrors] = useState({ email: "", otp: "" });
  const [email, setEmail] = useState(emailFromUrl || "");

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

  const sendOTPRequest = async () => {
    try {
      if (!email) {
        alert("Something wrong happend. Email not found.");
        return;
      }

      await authAPI.generateOTP(email);

      setCountdown(45);
    } catch (error) {
      alert("Error sending OTP.");
      console.log(error);
    }
  };

  const confirmOTP = async () => {
    try {
      const response = await authAPI.confirmOTP(email!, otp);
      const data = await response;
      if (data.status === 200) {
        toast({
          title: "OTP confirmed successfully!",
          description: "Navigating to login page..."
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        alert("Invalid OTP.");
      }
    } catch (error) {
      alert("Error confirming OTP.");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray5">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-appPrimary">Activate your account</h1>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); }}
            onFocus={() => setInputErrors({ ...inputErrors, email: "" })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-1 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-appPrimary"
          />
          {inputErrors.email && <p className="mt-2 text-sm text-appHard">{inputErrors.email}</p>}
        </div>
        <div className="">
          <label htmlFor="otp" className="block mb-1 text-sm font-bold text-gray-700">
            Enter OTP
          </label>
          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <div id="buttons" className="flex justify-center mt-4 gap-x-8">
            <button
              onClick={sendOTPRequest}
              disabled={countdown > 0}
              className={`px-6 py-2 mt-4 font-semibold text-white transition rounded-lg ${countdown > 0 ? "bg-gray-400" : "bg-appPrimary hover:opacity-90"}`}
            >
              {countdown > 0 ? `Resend (${countdown}s)` : "Send OTP"}
            </button>
            <button
              onClick={confirmOTP}
              className="px-6 py-2 mt-4 font-semibold text-white transition rounded-lg bg-appPrimary hover:opacity-90"
            >
              Confirm OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
