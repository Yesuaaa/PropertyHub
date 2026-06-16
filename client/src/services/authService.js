import api from './axiosInstance.js';

export const loginUser = (email, password) =>
  api.post('/auth/login', { email, password });

export const registerUser = (data) =>
  api.post('/auth/register', data);

export const logoutUser = () =>
  api.post('/auth/logout');

export const getMe = () =>
  api.get('/auth/me');

export const verifyOTP = (email, otp) =>
  api.post('/auth/verify-otp', { email, otp });

export const resendOTP = (email) =>
  api.post('/auth/resend-otp', { email });

export const forgotPassword = (email) =>
  api.post('/auth/forgot-password', { email });

export const resetPassword = (email, otp, newPassword) =>
  api.post('/auth/reset-password', { email, otp, newPassword });
