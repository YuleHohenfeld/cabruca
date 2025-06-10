

import axios from 'axios';
import api from './api';

interface MockUser {
  id: string;
  name: string;
  email?: string;
  cnpj?: string; 
}

const mockUsers: (MockUser & { password?: string })[] = [
  { id: '1', email: 'adm@gmail.com', password: '12345', name: 'Administrador Mock 1' },
  { id: '2', cnpj: '11222333000144', password: 'abc', name: 'Empresa Mock CNPJ 1' },
];

const mockLogin = (email: string, password: string): Promise<LoginResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userFound = mockUsers.find(u =>
        (u.email === email && u.password === password) ||
        (u.cnpj === email && u.password === password)
      );

      if (userFound) {
       
        resolve({ success: true, message: `Login mock bem-sucedido para: ${userFound.name}` });
      } else {
        resolve({ success: false, message: 'Credenciais inválidas.' });
      }
    }, 500);
  });
};

interface LoginResponse {
  success: boolean;
  message?: string;
}


const realLogin = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    await api.post('/user_admin/login', {
      admin_email: email,
      admin_password: password, 
    });
    return { success: true };
  } catch (error) {
 
    throw error;
  }
};




export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    console.log("Tentando login com a API real...");

    const response = await realLogin(email, password);
    return response;

  } catch (error) {
    if (!axios.isAxiosError(error) || !error.response) {
      console.log("API real falhou (erro de rede). Usando o MOCK como fallback...");
      return mockLogin(email, password);
    }
    
   
    console.log("API real respondeu com erro:", error.response.data?.error);
    const errorMessage = error.response.data?.error || 'Credenciais inválidas.';
    return { success: false, message: errorMessage };
  }
};