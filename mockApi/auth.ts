
export interface User {
  id: string;
  name: string;
  email?: string;
  cnpj?: string;  
}

interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export const mockUsers: (User & { password?: string })[] = [
  { id: '1', email: 'adm@gmail.com', password: '12345', name: 'Administrador 1' },
  { id: '2', cnpj: '11222333000144', password: 'abc', name: 'Empresa CNPJ 1' },
  { id: '3', email: 'adm2@gmail.com', cnpj: '44555666000177', password: 'def', name: 'Administrador 1' },
  { id: '4', email: 'usuario@email.com', password: 'senhaantiga', name: 'Usuário Teste' },
];

export const login = (identifier?: string, password?: string): Promise<LoginResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!identifier || !password) {
        resolve({ success: false, message: 'Identificador (Email/CNPJ) e senha são obrigatórios.' });
        return;
      }

      const userFound = mockUsers.find(u =>
        (u.email === identifier && u.password === password) ||
        (u.cnpj === identifier && u.password === password)
      );

      if (userFound) {
        const { password: _, ...userToReturn } = userFound;
        resolve({
          success: true,
          user: userToReturn,
          token: 'mock-jwt-token-' + Math.random().toString(36).substring(7),
        });
      } else {
        resolve({ success: false, message: 'Identificador ou senha inválidos.' });
      }
    }, 1000);
  });
};