// mockApi/products.ts

export interface Product {
  id: string;
  name: string;
  brandDetails: string;
  imageName: string;
  description_detail: string;
  characteristics?: string[];
  lactoseInfo?: string;
  sugarType?: string;
  glutenInfo?: string;
  availability?: string;
  leadTime?: string;
  shelfLife?: string;
  certificates?: string[];
  awards?: string[];
  packagingType?: string;
  defaultExchange?: string;
  defaultPriceFob?: string;
  defaultQuantity?: string;
  defaultTotalValue?: string;
  defaultBox?: string;
}

interface GetProductsResponse {
  success: boolean;
  products: Product[];
  message?: string;
}

interface GetProductByIdResponse {
  success: boolean;
  product?: Product;
  message?: string;
}

// --- DEFINIÇÕES PARA PEDIDOS ---
export interface OrderProductItemDetails { // Detalhes do produto DENTRO de um pedido
  productId: string;
  name: string;      // Nome do produto no momento do pedido
  quantity: number;
  priceFob?: string;  // Preço no momento do pedido
}

export interface Order { // Estrutura de um Pedido
  id: string;
  data: string; // Data formatada
  status: string;
  corStatus: string;
  produtos: OrderProductItemDetails[]; // Array de produtos do pedido
  produtor: string; // Nome do cliente/produtor que fez o pedido (ou para quem foi feito)
  totalOrderValue?: string;
  exchangeRate?: string;
}

export interface OrderDetails { // O que vem do formulário PedirProdutoScreen
  productId: string;
  productName?: string;
  exchangeRate?: string;
  priceFob?: string;
  quantity: number | string;
  totalValue?: string;
  boxCount?: number | string;
  requestedBy?: string; // Quem está fazendo o pedido (ex: "Admin fazendo para Produtor X" ou "Produtor Y")
}

interface PlaceOrderResponse {
  success: boolean;
  message: string;
  orderId?: string;
}

interface GetOrdersResponse {
  success: boolean;
  orders: Order[];
  message?: string;
}

// "Banco de dados" de Produtos
const allMockProducts: Product[] = [
  { id: 'prod1', name: 'Chocolate meio amargo', brandDetails: 'Lacta Amaro - 40% cacau', imageName: 'meioamargoamaro.png', description_detail: 'Delicioso chocolate...', defaultExchange: 'USD', defaultPriceFob: '0.85', defaultQuantity: '90', defaultTotalValue: '76,50', defaultBox: '1', characteristics: ['Sabor intenso'], lactoseInfo: 'Contém lactose', sugarType: 'Açúcares', glutenInfo: 'Pode conter', availability: '1000 cx', leadTime: '3-5d', shelfLife: '12m', certificates: ['Qualidade'], awards: ['Sabor'], packagingType: '80g' },
  { id: 'prod2', name: 'Chocolate Amargo Especial 70%', brandDetails: 'Lacta Amaro - 70% cacau', imageName: 'amaro2.png', description_detail: 'Intensidade pura...', defaultExchange: 'USD', defaultPriceFob: '1.20', defaultQuantity: '50', defaultTotalValue: '60,00', defaultBox: '1', characteristics: ['70% Cacau'], lactoseInfo: 'Sem lactose', sugarType: 'Baixo teor', glutenInfo: 'Sem glúten', availability: '500 cx', leadTime: '4-6d', shelfLife: '18m', certificates: ['Orgânico'], awards: [], packagingType: '100g' },
  { id: 'prod3', name: 'Chocolate ao leite Lacta', brandDetails: 'Lacta Clássicos - 80g', imageName: 'aoleite.png', description_detail: 'O clássico irresistível...', defaultExchange: 'USD', defaultPriceFob: '0.75', defaultQuantity: '120', defaultTotalValue: '90,00', defaultBox: '1', characteristics: ['Cremoso'], lactoseInfo: 'Contém lactose', sugarType: 'Açúcares', glutenInfo: 'Pode conter', availability: '2000 cx', leadTime: '2-4d', shelfLife: '10m', certificates: ['Qualidade'], awards: ['Mais Vendido'], packagingType: '80g' },
  { id: 'prod4', name: 'Chocolate Branco Demeter', brandDetails: 'Demeter Chocolates Especiais', imageName: 'demeter.png', description_detail: 'Suavidade e requinte...', defaultExchange: 'EUR', defaultPriceFob: '1.10', defaultQuantity: '70', defaultTotalValue: '77,00', defaultBox: '1', characteristics: ['Branco Premium'], lactoseInfo: 'Contém lactose', sugarType: 'Açúcares', glutenInfo: 'Pode conter', availability: '300 cx', leadTime: '5-7d', shelfLife: '9m', certificates: ['Artesanal'], awards: [], packagingType: '90g' },
];

// "Banco de dados" de Pedidos (começa com os que você já tinha na tela)
const mockAllOrders: Order[] = [
  {
    id: 'ord_exemplo_1',
    data: '6 de julho, 2025',
    status: 'Pedido pendente',
    corStatus: '#FF2D2D',
    produtos: [
      { productId: 'prod1', name: 'Chocolate dark 40%', quantity: 10, priceFob: '0.85' },
      { productId: 'prod3', name: 'Chocolate ao leite', quantity: 10, priceFob: '0.75' },
    ],
    produtor: '(nomeprodutor)', // Este é o cliente/solicitante do pedido
    totalOrderValue: "16,00",
    exchangeRate: "USD",
  },
  {
    id: 'ord_exemplo_2',
    data: '10 de maio, 2025',
    status: 'Pedido finalizado',
    corStatus: '#00FF88',
    produtos: [
      { productId: 'prod1', name: 'Chocolate dark 40%', quantity: 11, priceFob: '0.85' },
    ],
    produtor: '(nomeprodutor)',
    totalOrderValue: "9,35",
    exchangeRate: "USD",
  },
];

// Funções para Produtos (mantenha as suas)
export const getMockProducts = (): Promise<GetProductsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, products: [...allMockProducts] });
    }, 300);
  });
};

export const getMockProductById = (productId: string): Promise<GetProductByIdResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = allMockProducts.find(p => p.id === productId);
      if (product) {
        resolve({ success: true, product: { ...product } });
      } else {
        resolve({ success: false, message: 'Produto não encontrado.' });
      }
    }, 200);
  });
};

// Função para "fazer" um pedido e ADICIONAR à lista mockAllOrders
export const placeMockOrder = (orderDetails: OrderDetails): Promise<PlaceOrderResponse> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const productInfo = allMockProducts.find(p => p.id === orderDetails.productId);
      if (!productInfo) {
        resolve({ success: false, message: "Produto base do pedido não encontrado." });
        return;
      }

      const orderId = `ORDMOCK_${Date.now()}`; // ID de pedido simples
      const newOrder: Order = {
        id: orderId,
        data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) + `, ${new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}`,
        status: 'Pedido pendente', // Status inicial
        corStatus: '#FF2D2D',     // Cor para pendente
        produtos: [ // Este mock simples assume apenas UM produto por pedido. Adapte se necessário.
          {
            productId: orderDetails.productId,
            name: productInfo.name, // Usa o nome do produto encontrado
            quantity: Number(orderDetails.quantity), // Garante que é número
            priceFob: orderDetails.priceFob,
          },
        ],
        produtor: orderDetails.requestedBy || '(Cliente Desconhecido)', // Quem fez/para quem é o pedido
        totalOrderValue: orderDetails.totalValue,
        exchangeRate: orderDetails.exchangeRate,
      };

      mockAllOrders.unshift(newOrder); // Adiciona o novo pedido NO INÍCIO da lista

      console.log("[MOCK API] Novo Pedido Adicionado à Lista:", newOrder);
      console.log("[MOCK API] Total de Pedidos Agora:", mockAllOrders.length);
      resolve({
        success: true,
        message: `Pedido para '${productInfo.name}' recebido!\nID: ${orderId}`,
        orderId: orderId,
      });
    }, 600);
  });
};

// Nova função para buscar todos os pedidos mockados
export const getMockOrders = (userIdentifier?: string): Promise<GetOrdersResponse> => {
  return new Promise(resolve => {
    setTimeout(() => {
      let ordersToReturn = [...mockAllOrders];
      // Se você precisar filtrar pedidos por 'produtor' (quem fez o pedido), adicione a lógica aqui:
      // if (userIdentifier) {
      //   ordersToReturn = mockAllOrders.filter(order => order.produtor === userIdentifier);
      // }
      console.log(`[MOCK API] Retornando ${ordersToReturn.length} pedidos.`);
      resolve({
        success: true,
        orders: ordersToReturn, // Retorna a lista de pedidos (os mais novos primeiro devido ao unshift)
      });
    }, 400);
  });
};