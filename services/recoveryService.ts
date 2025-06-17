import api from './api';


export const requestPasswordResetAPI = async (email: string) => {

  await api.post('/user_admin/forgot-password', {
    admin_email: email,
  });
};


export const verifyCodeAPI = async (email: string, code: string) => {
  const response = await api.post('/user_admin/verify-reset-code', {
    admin_email: email,
    code,
  });
  return response.data;
};

export const resetPasswordAPI = async (email: string, code: string, newPassword: string) => {
  const response = await api.post('/user_admin/reset-password', {
    admin_email: email,
    code,
    new_password: newPassword,
  });
  return response.data;
};