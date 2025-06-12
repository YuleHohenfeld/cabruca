

import axios from 'axios';
import api from './api';


export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}


export const loginAdmin = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post('/user_admin/login', {
  
      admin_email: email,
      admin_password: password,
    });

    const token = response.data.token;

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { success: true, token: token };
    } else {
      return { success: false, message: 'Token não retornado pelo servidor.' };
    }

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Detalhes Completos do Erro da API:', JSON.stringify(error.response.data, null, 2));
      const errorMessage = error.response.data?.error || 'Credenciais inválidas.';
      return { success: false, message: errorMessage };
    } else {
      console.error('Erro de Rede ou Outro Problema:', error);
      return { success: false, message: 'Não foi possível conectar ao servidor.' };
    }
  }
};

