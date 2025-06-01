

export interface Message {
  id: string;
  from: string; 
  to: string;   
  subject: string;
  body: string;
  createdAt: Date; 
  read?: boolean; 
}

interface SendMessageResponse {
  success: boolean;
  message: string;
  sentMessage?: Message;
}

interface GetMessagesResponse {
  success: boolean;
  messages: Message[];
  message?: string; 
}

const allMessages: Message[] = [
  {
    id: 'msg1',
    from: 'ADMIN',
    to: 'NOME DO PRODUTOR', 
    subject: 'Re: Pedido #123',
    body: 'Olá Produtor, seu pedido #123 foi atualizado. Verifique o status.',
    createdAt: new Date('2025-05-15T15:35:00Z'),
    read: true,
  },
  {
    id: 'msg2',
    from: 'NOME DO PRODUTOR', 
    to: 'ADMIN',
    subject: 'Dúvida sobre Produto X',
    body: 'Gostaria de saber mais informações sobre o Produto X antes de fazer o pedido.',
    createdAt: new Date('2025-05-10T13:30:00Z'),
  },
  {
    id: 'msg3',
    from: 'ADMIN',
    to: 'NOME DO PRODUTOR',
    subject: 'Bem-vindo à Plataforma!',
    body: 'Seja bem-vindo! Explore nossos produtos e qualquer dúvida estamos à disposição.',
    createdAt: new Date('2025-04-05T13:50:00Z'),
  },

];

export const sendMockMessage = (
  from: string,
  to: string,
  subject: string,
  body: string
): Promise<SendMessageResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMessage: Message = {
        id: `msg${allMessages.length + 1}`, 
        from,
        to,
        subject,
        body,
        createdAt: new Date(),
        read: false, 
      };
      allMessages.push(newMessage); 
      console.log('[MOCK API] Nova mensagem enviada:', newMessage);
      console.log('[MOCK API] Todas as mensagens agora:', allMessages);
      resolve({
        success: true,
        message: 'Mensagem enviada com sucesso!',
        sentMessage: newMessage,
      });
    }, 700); 
  });
};

export const getMockReceivedMessages = (
  currentUserIdentifier: string
): Promise<GetMessagesResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const received = allMessages.filter(
        (msg) => msg.to === currentUserIdentifier
      ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); 

      console.log(`[MOCK API] Mensagens recebidas por ${currentUserIdentifier}:`, received);
      resolve({
        success: true,
        messages: received,
      });
    }, 500);
  });
};

export const getMockSentMessages = (
  currentUserIdentifier: string
): Promise<GetMessagesResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sent = allMessages.filter(
        (msg) => msg.from === currentUserIdentifier
      ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      console.log(`[MOCK API] Mensagens enviadas por ${currentUserIdentifier}:`, sent);
      resolve({
        success: true,
        messages: sent,
      });
    }, 500);
  });
};