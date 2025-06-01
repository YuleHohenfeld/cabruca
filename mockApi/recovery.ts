import { mockUsers } from './auth';

console.log('[MOCK recovery.ts] mockUsers importado no topo do arquivo:', JSON.stringify(mockUsers, null, 2));

const mockRegisteredIdentifiers: string[] = [
  'usuario@email.com',
  '12345678000199',
  'adm@gmail.com',     
  '11222333000144',   
  'outro@gmail.com',    
];

let activeRecoveryAttempt: { identifier: string; code: string } | null = null;

export const requestPasswordRecoveryCode = (identifier: string): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const identifierExists = mockRegisteredIdentifiers.includes(identifier.toLowerCase()); 

      if (identifierExists) {
        const recoveryCode = Math.floor(10000 + Math.random() * 90000).toString();
        activeRecoveryAttempt = { identifier, code: recoveryCode };
        console.log(`(MOCK - recovery.ts) Código de recuperação para ${identifier}: ${recoveryCode}`);
        resolve({ success: true, message: 'Código enviado para seu e-mail/dispositivo.' });
      } else {
        resolve({ success: false, message: 'Email/CNPJ não encontrado em nossa base.' });
      }
    }, 800);
  });
};

export const verifyPasswordRecoveryCode = (identifier: string, code: string): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (activeRecoveryAttempt && activeRecoveryAttempt.identifier.toLowerCase() === identifier.toLowerCase() && activeRecoveryAttempt.code === code) {
        resolve({ success: true, message: 'Código verificado com sucesso!' });
        activeRecoveryAttempt = null;
      } else {
        resolve({ success: false, message: 'Código inválido ou expirado. Tente novamente.' });
      }
    }, 800);
  });
};

export const resetPassword = (identifier: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userIndex = mockUsers.findIndex(
        (u) => u.email?.toLowerCase() === identifier.toLowerCase() || u.cnpj === identifier
      );

      if (userIndex !== -1) {
        mockUsers[userIndex].password = newPassword; 
        console.log(`[MOCK] Senha para '${identifier}' atualizada para '${newPassword}'`);
        resolve({ success: true, message: 'Senha redefinida com sucesso!' });
      } else {
  
        resolve({ success: false, message: 'Usuário não encontrado para redefinir a senha.' });
      }
    }, 700);
  });
};