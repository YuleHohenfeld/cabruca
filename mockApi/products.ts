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

// --- Interfaces relacionadas a Pedidos ---
export interface OrderProductItem { // Detalhe de um produto DENTRO de um pedido
  productId: string;
  name: string;      // Nome do produto no momento do pedido
  quantity: number;
  priceFob?: string;  // Preço no momento do pedido
}

export interface Order { // Estrutura de um Pedido completo
  id: string;           // ID único do pedido
  data: string;         // Data do pedido (string formatada)
  status: string;       // Ex: 'Pedido pendente', 'Pedido finalizado'
  corStatus: string;    // Cor para o status
  produtos: OrderProductItem[]; // Lista de produtos neste pedido
  produtor: string;     // Nome do cliente/solicitante (quem fez o pedido)
  totalOrderValue?: string; // Valor total do pedido
  exchangeRate?: string;    // Câmbio usado
}

export interface OrderDetails { // Dados que vêm do formulário PedirProdutoScreen
  productId: string;
  productName?: string;
  exchangeRate?: string;
  priceFob?: string;
  quantity: number | string; // Pode vir como string do input
  totalValue?: string;
  boxCount?: number | string;
  requestedBy?: string; // Identificador de quem está fazendo o pedido
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

interface PlaceOrderResponse {
  success: boolean;
  message: string;
  orderId?: string;
  order?: Order; // Adicionado para retornar o pedido criado
}

interface GetOrdersResponse { // Nova interface para a resposta de buscar pedidos
  success: boolean;
  orders: Order[];
  message?: string;
}

// "Banco de dados" mockado de Produtos (seu array allMockProducts existente)
const allMockProducts: Product[] = [
  { id: 'prod1', name: 'Chocolate meio amargo', brandDetails: 'Lacta Amaro - 40% cacau', imageName: 'meioamargoamaro.png', description_detail: 'Experimente a intensidade...', defaultExchange: 'USD', defaultPriceFob: '0.85', defaultQuantity: '90', defaultTotalValue: '76,50', defaultBox: '1', characteristics: ['Sabor intenso'], lactoseInfo: 'Contém lactose', sugarType: 'Açúcares', glutenInfo: 'Pode conter', availability: '1000 cx', leadTime: '3-5d', shelfLife: '12m', certificates: ['Qualidade'], awards: ['Sabor'], packagingType: '80g' },
  { id: 'prod2', name: 'Chocolate Amargo Especial 70%', brandDetails: 'Lacta Amaro - 70% cacau', imageName: 'amaro2.png', description_detail: 'Para os paladares mais apurados...', defaultExchange: 'USD', defaultPriceFob: '1.20', defaultQuantity: '50', defaultTotalValue: '60,00', defaultBox: '1', characteristics: ['70% Cacau'], lactoseInfo: 'Sem lactose', sugarType: 'Baixo teor', glutenInfo: 'Sem glúten', availability: '500 cx', leadTime: '4-6d', shelfLife: '18m', certificates: ['Orgânico'], awards: [], packagingType: '100g' },
  { id: 'prod3', name: 'Chocolate ao leite Lacta', brandDetails: 'Lacta Clássicos - 80g', imageName: 'aoleite.png', description_detail: 'O inconfundível sabor...', defaultExchange: 'USD', defaultPriceFob: '0.75', defaultQuantity: '120', defaultTotalValue: '90,00', defaultBox: '1', characteristics: ['Cremoso'], lactoseInfo: 'Contém lactose', sugarType: 'Açúcares', glutenInfo: 'Pode conter', availability: '2000 cx', leadTime: '2-4d', shelfLife: '10m', certificates: ['Qualidade'], awards: ['Mais Vendido'], packagingType: '80g' },
  { id: 'prod4', name: 'Chocolate Branco Demeter', brandDetails: 'Demeter Chocolates Especiais', imageName: 'demeter.png', description_detail: 'A suavidade do chocolate...', defaultExchange: 'EUR', defaultPriceFob: '1.10', defaultQuantity: '70', defaultTotalValue: '77,00', defaultBox: '1', characteristics: ['Branco Premium'], lactoseInfo: 'Contém lactose', sugarType: 'Açúcares', glutenInfo: 'Pode conter', availability: '300 cx', leadTime: '5-7d', shelfLife: '9m', certificates: ['Artesanal'], awards: [], packagingType: '90g' },
];

// Array em memória para armazenar os pedidos feitos
const mockAllOrders: Order[] = [
  // Seus pedidos de exemplo iniciais da PedidosScreen
  {
    id: 'mockOrd1',
    data: '6 de julho, 2025',
    status: 'Pedido pendente',
    corStatus: '#FF2D2D',
    produtos: [
      { productId: 'prod1', name: 'Chocolate dark 40%', quantity: 10, priceFob: '0.85' },
      { productId: 'prod3', name: 'Chocolate ao leite', quantity: 10, priceFob: '0.75' },
    ],
    produtor: '(nomeprodutor)',
    totalOrderValue: "16,00",
    exchangeRate: "USD",
  },
  {
    id: 'mockOrd2',
    data: '10 de maio, 2025',
    status: 'Pedido finalizado',
    corStatus: '#00FF88',
    produtos: [
      { productId: 'prod1', name: 'Chocolate dark 40%', quantity: 11, priceFob: '0.85' },
    ],
    produtor: '(nomeprodutor)', // Ajustado para diferenciar
    totalOrderValue: "9,35",
    exchangeRate: "USD",
  },
];

// Suas funções getMockProducts e getMockProductById existentes (mantenha-as como estão)
export const getMockProducts = (): Promise<GetProductsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('[MOCK API products.ts] Retornando todos os produtos.');
      resolve({ success: true, products: [...allMockProducts] });
    }, 300);
  });
};

export const getMockProductById = (productId: string): Promise<GetProductByIdResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = allMockProducts.find(p => p.id === productId);
      if (product) {
        console.log(`[MOCK API products.ts] Produto encontrado por ID (${productId}).`);
        resolve({ success: true, product: { ...product } });
      } else {
        console.log(`[MOCK API products.ts] Produto com ID (${productId}) NÃO encontrado.`);
        resolve({ success: false, message: 'Produto não encontrado.' });
      }
    }, 200);
  });
};

// MODIFICADA: Função para "fazer" um pedido e ADICIONAR à lista mockAllOrders
export const placeMockOrder = (orderDetails: OrderDetails): Promise<PlaceOrderResponse> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const productInfo = allMockProducts.find(p => p.id === orderDetails.productId);
      if (!productInfo) {
        // Este log ajuda a ver se o produto foi encontrado para criar o pedido
        console.error("[MOCK API products.ts] Erro em placeMockOrder: Produto base do pedido não encontrado. ID:", orderDetails.productId);
        resolve({ success: false, message: "Produto base do pedido não encontrado no mock." });
        return;
      }

      const orderId = `ORD-MOCK-${Date.now()}${Math.floor(Math.random()*100)}`;
      const newOrder: Order = {
        id: orderId,
        data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: 'Pedido pendente', // Status inicial
        corStatus: '#FF2D2D',     // Cor para pendente
        produtos: [ // Simplesmente adiciona o produto que foi pedido
          {
            productId: orderDetails.productId,
            name: productInfo.name, // Usa o nome do produto encontrado
            quantity: Number(orderDetails.quantity), // Garante que é número
            priceFob: orderDetails.priceFob,
          },
        ],
        // O campo 'produtor' aqui seria quem fez o pedido.
        // Se o app é de admin, e ele faz pedido PARA um produtor,
        // o 'requestedBy' do orderDetails deveria ser o nome/ID desse produtor.
        // Se o app é de produtor, seria o nome/ID do produtor logado.
        produtor: orderDetails.requestedBy || "(Admin/Usuário do App)",
        totalOrderValue: orderDetails.totalValue,
        exchangeRate: orderDetails.exchangeRate,
      };

      mockAllOrders.unshift(newOrder); // Adiciona o novo pedido NO INÍCIO da lista

      console.log("[MOCK API products.ts] Novo Pedido ADICIONADO à Lista:", JSON.stringify(newOrder, null, 2));
      console.log("[MOCK API products.ts] Total de Pedidos Agora:", mockAllOrders.length);
      resolve({
        success: true,
        message: `Pedido para '${productInfo.name}' recebido com sucesso!\nID do Pedido: ${orderId}`,
        orderId: orderId,
        order: newOrder, // Retorna o pedido criado
      });
    }, 600);
  });
};

// NOVA FUNÇÃO: Para buscar todos os pedidos
export const getMockOrders = (filterByUser?: string): Promise<GetOrdersResponse> => {
  return new Promise(resolve => {
    setTimeout(() => {
      let ordersToReturn = [...mockAllOrders];
      if (filterByUser) {
        // Se você quiser filtrar pedidos por quem os fez (o campo 'produtor' no objeto Order)
        ordersToReturn = ordersToReturn.filter(order => order.produtor === filterByUser);
      }
      console.log(`[MOCK API products.ts] Retornando ${ordersToReturn.length} pedidos.`);
      resolve({
        success: true,
        orders: ordersToReturn, // Retorna a lista (mais novos primeiro devido ao unshift)
      });
    }, 400);
  });
};