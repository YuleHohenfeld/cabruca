// mockApi/products.ts

export interface Product {
  id: string;
  name: string;
  brandDetails: string;
  imageName: string; // Nome do arquivo da imagem em ./assets (ex: 'meioamargoamaro.png')
  description_detail: string; // A descrição longa para a tela de detalhes
  // Detalhes que podem aparecer na tela de "Detalhe do Produto"
  characteristics?: string[];
  lactoseInfo?: string;
  sugarType?: string;
  glutenInfo?: string;
  availability?: string;
  leadTime?: string;
  shelfLife?: string; // Validade
  certificates?: string[];
  awards?: string[];
  packagingType?: string;
  // Valores padrão para a tela de "Pedir Produto"
  defaultExchange?: string;
  defaultPriceFob?: string;
  defaultQuantity?: string;
  defaultTotalValue?: string; // Pode ser calculado ou um valor inicial
  defaultBox?: string;
}

// Interfaces para as respostas das funções de buscar produtos
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

// Interface para os detalhes do pedido que serão enviados pela tela de pedido
export interface OrderDetails {
  productId: string;
  productName?: string; // Útil para logs ou confirmação
  exchangeRate?: string;
  priceFob?: string;
  quantity: number | string; // O input pode ser string, converter para número ao processar
  totalValue?: string;      // Pode ser string vinda do input ou calculada
  boxCount?: number | string;   // O input pode ser string
}

// Interface para a resposta da função de fazer pedido
interface PlaceOrderResponse {
  success: boolean;
  message: string;
  orderId?: string;
}

// SEU "BANCO DE DADOS" MOCKADO DE PRODUTOS
const allMockProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Chocolate meio amargo',
    brandDetails: 'Lacta Amaro - 40% cacau',
    imageName: 'meioamargoamaro.png',
    description_detail: 'Experimente a intensidade e a sofisticação do Chocolate Meio Amargo Lacta Amaro 40% Cacau. Com 80g de puro prazer, esta barra é ideal para os amantes de um sabor mais marcante, equilibrando o amargor do cacau com uma doçura sutil. Perfeito para degustar a qualquer momento ou para adicionar um toque especial às suas receitas de sobremesas.',
    characteristics: ['Sabor intenso', '40% Cacau', 'Barra de 80g', 'Ideal para receitas'],
    lactoseInfo: 'Contém lactose. Contém derivados de leite e soja.',
    sugarType: 'Açúcares (sacarose)',
    glutenInfo: 'Pode conter traços de trigo, cevada, amendoim, avelã e látex natural.',
    availability: '1000 caixas (90 unidades/caixa)',
    leadTime: '3-5 dias úteis para entrega',
    shelfLife: '12 meses a partir da data de fabricação',
    certificates: ['Selo de Qualidade Lacta', 'ABICAB'],
    awards: ['Melhor Sabor Intenso 2023 (Revista Paladar)'],
    packagingType: 'Embalagem individual de 80g, caixa com 90 unidades',
    defaultExchange: 'USD', // Dólar Americano
    defaultPriceFob: '0.85', // Preço por unidade
    defaultQuantity: '90',   // Quantidade de unidades (1 caixa)
    defaultTotalValue: '76,50', // 0.85 * 90 (Exemplo, pode ser calculado na tela)
    defaultBox: '1',
  },
  {
    id: 'prod2',
    name: 'Chocolate Amargo Especial 70%',
    brandDetails: 'Lacta Amaro - 70% cacau',
    imageName: 'amaro2.png',
    description_detail: 'Para os paladares mais apurados, o Chocolate Amargo Especial Lacta Amaro com 70% de cacau oferece uma experiência sensorial única. Notas profundas de cacau com um final prolongado. Ideal para harmonizar com cafés ou vinhos.',
    characteristics: ['Extra Amargo', '70% Cacau', 'Notas frutadas', 'Barra de 100g'],
    lactoseInfo: 'Pode conter traços de lactose',
    sugarType: 'Baixo teor de açúcar',
    glutenInfo: 'Não contém glúten',
    availability: '500 caixas (50 unidades/caixa)',
    leadTime: '4-6 dias úteis',
    shelfLife: '18 meses',
    certificates: ['Certificado de Origem do Cacau'],
    awards: [],
    packagingType: 'Embalagem individual de 100g, caixa com 50 unidades',
    defaultExchange: 'USD',
    defaultPriceFob: '1.20',
    defaultQuantity: '50',
    defaultTotalValue: '60,00',
    defaultBox: '1',
  },
  {
    id: 'prod3',
    name: 'Chocolate ao leite Lacta',
    brandDetails: 'Lacta Clássicos - 80g',
    imageName: 'aoleite.png',
    description_detail: 'O inconfundível sabor do Chocolate ao Leite Lacta, com sua cremosidade e doçura na medida certa. Perfeito para compartilhar ou para aquele momento só seu. A barra de 80g é ideal para matar a vontade de chocolate.',
    characteristics: ['Cremoso', 'Ao Leite Tradicional', 'Barra de 80g', 'Sabor Clássico'],
    lactoseInfo: 'Contém lactose. Contém derivados de leite e soja.',
    sugarType: 'Açúcares (sacarose)',
    glutenInfo: 'Pode conter traços de trigo e cevada.',
    availability: '2000 caixas (120 unidades/caixa)',
    leadTime: '2-4 dias úteis',
    shelfLife: '10 meses',
    certificates: ['Selo de Qualidade Lacta'],
    awards: ['Mais Vendido 2023'],
    packagingType: 'Embalagem individual de 80g, caixa com 120 unidades',
    defaultExchange: 'USD',
    defaultPriceFob: '0.75',
    defaultQuantity: '120',
    defaultTotalValue: '90,00',
    defaultBox: '1',
  },
  {
    id: 'prod4',
    name: 'Chocolate Branco Demeter',
    brandDetails: 'Demeter Chocolates Especiais',
    imageName: 'demeter.png',
    description_detail: 'A suavidade do chocolate branco premium da Demeter, elaborado com manteiga de cacau de alta qualidade e um toque de baunilha. Uma experiência delicada e envolvente para os apreciadores de chocolate branco.',
    characteristics: ['Chocolate Branco Premium', 'Suave', 'Notas de Baunilha', 'Barra de 90g'],
    lactoseInfo: 'Contém lactose.',
    sugarType: 'Açúcares',
    glutenInfo: 'Pode conter traços de glúten.',
    availability: '300 caixas (70 unidades/caixa)',
    leadTime: '5-7 dias úteis',
    shelfLife: '9 meses',
    certificates: ['Selo de Ingredientes Selecionados Demeter'],
    awards: [],
    packagingType: 'Embalagem individual de 90g, caixa com 70 unidades',
    defaultExchange: 'EUR', // Euro
    defaultPriceFob: '1.10', // Preço em Euro
    defaultQuantity: '70',
    defaultTotalValue: '77,00', // Em Euro
    defaultBox: '1',
  },
];

// Função para buscar todos os produtos
export const getMockProducts = (): Promise<GetProductsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('[MOCK API products.ts] Retornando todos os produtos.');
      resolve({
        success: true,
        products: [...allMockProducts], // Retorna uma cópia
      });
    }, 300); // Reduzi o delay para teste
  });
};

// Função para buscar um produto específico pelo ID
export const getMockProductById = (productId: string): Promise<GetProductByIdResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = allMockProducts.find(p => p.id === productId);
      if (product) {
        console.log(`[MOCK API products.ts] Produto encontrado por ID (${productId}).`);
        resolve({ success: true, product: { ...product } }); // Retorna uma cópia
      } else {
        console.log(`[MOCK API products.ts] Produto com ID (${productId}) NÃO encontrado.`);
        resolve({ success: false, message: 'Produto não encontrado.' });
      }
    }, 200); // Reduzi o delay
  });
};

// Função para simular um pedido
export const placeMockOrder = (orderDetails: OrderDetails): Promise<PlaceOrderResponse> => {
  return new Promise(resolve => {
    setTimeout(() => {
        const orderId = `ORD-MOCK-${Date.now()}`;
        console.log("[MOCK API products.ts] Pedido recebido:", { orderId, ...orderDetails });
        // Aqui você poderia, se quisesse, diminuir o 'availability' do produto mockado,
        // mas lembre-se que isso só persistiria na memória durante a sessão do app.
        resolve({
            success: true,
            message: `Pedido para '${orderDetails.productName || 'produto selecionado'}' mockado com sucesso!\nID do Pedido: ${orderId}`,
            orderId: orderId
        });
    }, 600);
  })
};