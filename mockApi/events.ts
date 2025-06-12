

export interface EventReportProduct {
  name: string;
  quantity: string;
  exchange: string;
}

export interface EventReport {
  id: string; 
  eventName: string;
  eventCityCountry: string;
 
  reportId?: string;
  registrationDate?: string;
  responsible?: string;
  eventDate?: string; 
  eventType?: string;
  producerName?: string; 
  products: EventReportProduct[];
  cdp?: string; 
  totalValue?: string; 
  description?: string; 
  createdAt: Date; 
}


interface SubmitEventReportResponse {
  success: boolean;
  message: string;
  report?: EventReport; 
}


interface GetEventReportsResponse {
  success: boolean;
  reports: EventReport[];
  message?: string;
}


const mockAllEventReports: EventReport[] = [

  { id: 'evt_ex1', eventName: 'Chocolat Festival', eventCityCountry: 'Ilhéus, Brasil', products: [{name: 'Produto Exemplo', quantity: '10', exchange: 'BRL'}], createdAt: new Date('2025-07-01T10:00:00Z'), description: 'Participação no festival anual.' },
  { id: 'evt_ex2', eventName: 'Bean to Bar Chocolate Week', eventCityCountry: 'São Paulo, Brasil', products: [], createdAt: new Date('2025-06-15T10:00:00Z'), description: 'Semana de degustação e workshops.' },

];


export const submitMockEventReport = (
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
        reportId: `REP-${Date.now().toString().slice(-6)}`, 
        registrationDate: new Date().toLocaleDateString('pt-BR'), 
        eventName: reportData.eventName,
        eventCityCountry: reportData.eventCityCountry,
        responsible: reportData.responsible || 'Admin Padrão',
        eventDate: reportData.eventDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'), 
        eventType: reportData.eventType || 'Feira',
        producerName: reportData.producerName || 'Diversos Produtores',
        products: reportData.products,
        cdp: reportData.cdp,
        totalValue: reportData.totalValue,
        description: reportData.description,
      };
      mockAllEventReports.unshift(newReport); 
      console.log('[MOCK API events.ts] Novo Relatório Salvo:', newReport);
      console.log('[MOCK API events.ts] Total de Relatórios:', mockAllEventReports.length);
      resolve({
        success: true,
        message: `Relatório para "${newReport.eventName}" salvo com sucesso!`,
        report: newReport, 
      });
    }, 700);
  });
};


export const getMockEventReports = (): Promise<GetEventReportsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reports = [...mockAllEventReports].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      console.log(`[MOCK API events.ts] Retornando ${reports.length} relatórios de eventos.`);
      resolve({
        success: true,
        reports: reports,
      });
    }, 400);
  });
};


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