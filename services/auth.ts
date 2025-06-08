

import axios from 'axios';
import api from './api';

// --- Parte 1: Lógica do MOCK (baseado no que você enviou) ---

// A interface do usuário que o mock usa
interface MockUser {
  id: string;
  name: string;
  email?: string;
  cnpj?: string; 
}

// Os usuários de mentira
const mockUsers: (MockUser & { password?: string })[] = [
  { id: '1', email: 'adm@gmail.com', password: '12345', name: 'Administrador Mock 1' },
  { id: '2', cnpj: '11222333000144', password: 'abc', name: 'Empresa Mock CNPJ 1' },
];

// A função de login MOCK. Note que a renomeamos para 'mockLogin'.
// E ajustamos a resposta para ser compatível com a nossa tela de login atual.
const mockLogin = (email: string, password: string): Promise<LoginResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userFound = mockUsers.find(u =>
        (u.email === email && u.password === password) ||
        (u.cnpj === email && u.password === password)
      );

      if (userFound) {
        // Para ser compatível com a tela, retornamos uma resposta simples.
        resolve({ success: true, message: `Login mock bem-sucedido para: ${userFound.name}` });
      } else {
        resolve({ success: false, message: 'Credenciais inválidas no mock.' });
      }
    }, 500);
  });
};


// --- Parte 2: Lógica da API REAL ---

// A resposta que esperamos da API real ou do mock.
interface LoginResponse {
  success: boolean;
  message?: string;
}

// A função que chama a API REAL. Renomeamos para 'realLogin'.
const realLogin = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    await api.post('/user_admin/login', {
      admin_email: email,
      admin_password: password, 
    });
    return { success: true };
  } catch (error) {
    // Se deu erro, nós "relançamos" o erro para que a função principal possa decidir o que fazer.
    throw error;
  }
};


// --- Parte 3: A Função Principal que o seu App vai usar ---

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    console.log("Tentando login com a API real...");
    // Primeiro, tenta o login real.
    const response = await realLogin(email, password);
    return response;

  } catch (error) {
    // Se o login real falhou, verificamos o tipo de erro.
    // Se NÃO for um erro de resposta da API (ex: erro de rede), usamos o mock.
    if (!axios.isAxiosError(error) || !error.response) {
      console.log("API real falhou (erro de rede). Usando o MOCK como fallback...");
      return mockLogin(email, password);
    }
    
    // Se for um erro de resposta da API (ex: 401 Credenciais Inválidas), mostramos o erro.
    console.log("API real respondeu com erro:", error.response.data?.error);
    const errorMessage = error.response.data?.error || 'Credenciais inválidas.';
    return { success: false, message: errorMessage };
  }
};