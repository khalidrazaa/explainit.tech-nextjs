import { apiFetch } from '../api';

// ✅ Types for request/response
export type SendOtpRequest = {
  email: string;
};

export type SendOtpResponse = {
  message: string;
};

export type VerifyOtpRequest = {
  email: string;
  otp: string;
};

export type VerifyOtpResponse = {
  access_token: string;
  token_type: string;
};

// ✅ Functions
export async function sendOtp(payload: SendOtpRequest): Promise<SendOtpResponse> {
  return apiFetch<SendOtpResponse>("/auth/send-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyOtp(payload: VerifyOtpRequest): Promise<VerifyOtpResponse> {
  return apiFetch<VerifyOtpResponse>("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}