// mockApi/events.ts

export interface EventReportProduct {
  name: string;
  quantity: string;
  exchange: string;
}

export interface EventReport {
  id: string; // ID único do relatório
  eventName: string;
  eventCityCountry: string;
  // Campos "automáticos" que podem ser gerados pelo mock ou preenchidos no form
  reportId?: string;
  registrationDate?: string;
  responsible?: string;
  eventDate?: string; // Data do evento em si
  eventType?: string;
  producerName?: string; // Se aplicável
  // Lista de produtos associados a este relatório de evento
  products: EventReportProduct[];
  cdp?: string; // Custo de Desenvolvimento de Produto
  totalValue?: string; // Valor Total Estimado do evento/missão
  description?: string; // Descrição adicional
  createdAt: Date; // Data de criação do relatório para ordenação
}

// Resposta ao submeter um novo relatório
interface SubmitEventReportResponse {
  success: boolean;
  message: string;
  report?: EventReport; // O relatório que foi salvo
}

// Resposta ao buscar relatórios
interface GetEventReportsResponse {
  success: boolean;
  reports: EventReport[];
  message?: string;
}

// "Banco de dados" em memória para os relatórios de eventos
const mockAllEventReports: EventReport[] = [
  // Exemplos iniciais que você tinha na tela de listagem
  { id: 'evt_ex1', eventName: 'Chocolat Festival', eventCityCountry: 'Ilhéus, Brasil', products: [{name: 'Produto Exemplo', quantity: '10', exchange: 'BRL'}], createdAt: new Date('2025-07-01T10:00:00Z'), description: 'Participação no festival anual.' },
  { id: 'evt_ex2', eventName: 'Bean to Bar Chocolate Week', eventCityCountry: 'São Paulo, Brasil', products: [], createdAt: new Date('2025-06-15T10:00:00Z'), description: 'Semana de degustação e workshops.' },
  // Adicione mais se quiser
];

// Função para "salvar" um novo relatório de evento
export const submitMockEventReport = (
  // Recebe os dados do formulário. id e createdAt serão gerados.
  // Os campos "automáticos" podem vir do formulário ou ser preenchidos aqui.
  reportData: Omit<EventReport, 'id' | 'createdAt' | 'reportId' | 'registrationDate'> & {
    responsible?: string;
    eventDate?: string;
    eventType?: string;
    producerName?: string;
  }
): Promise<SubmitEventReportResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReport: EventReport = {
        id: `evtRpt_${Date.now()}`,
        createdAt: new Date(),
        reportId: `REP-${Date.now().toString().slice(-6)}`, // ID de relatório automático
        registrationDate: new Date().toLocaleDateString('pt-BR'), // Data de registro automática
        eventName: reportData.eventName,
        eventCityCountry: reportData.eventCityCountry,
        responsible: reportData.responsible || 'Admin Padrão', // Valor padrão se não vier
        eventDate: reportData.eventDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'), // Ex: Data do evento daqui a uma semana
        eventType: reportData.eventType || 'Feira',
        producerName: reportData.producerName || 'Diversos Produtores',
        products: reportData.products,
        cdp: reportData.cdp,
        totalValue: reportData.totalValue,
        description: reportData.description,
      };
      mockAllEventReports.unshift(newReport); // Adiciona no início da lista
      console.log('[MOCK API events.ts] Novo Relatório Salvo:', newReport);
      console.log('[MOCK API events.ts] Total de Relatórios:', mockAllEventReports.length);
      resolve({
        success: true,
        message: `Relatório para "${newReport.eventName}" salvo com sucesso!`,
        report: newReport, // Retorna o relatório salvo, incluindo seu ID
      });
    }, 700);
  });
};

// Função para buscar todos os relatórios de eventos
export const getMockEventReports = (): Promise<GetEventReportsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Retorna uma cópia ordenada pelos mais recentes
      const reports = [...mockAllEventReports].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      console.log(`[MOCK API events.ts] Retornando ${reports.length} relatórios de eventos.`);
      resolve({
        success: true,
        reports: reports,
      });
    }, 400);
  });
};

// (NOVO) Função para buscar um relatório de evento específico pelo ID
export const getMockEventReportById = (reportId: string): Promise<{success: boolean, report?: EventReport, message?: string}> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const report = mockAllEventReports.find(r => r.id === reportId);
            if (report) {
                console.log(`[MOCK API events.ts] Relatório encontrado por ID (${reportId}).`);
                resolve({ success: true, report: { ...report } });
            } else {
                console.log(`[MOCK API events.ts] Relatório com ID (${reportId}) NÃO encontrado.`);
                resolve({ success: false, message: 'Relatório não encontrado.' });
            }
        }, 200);
    });
};