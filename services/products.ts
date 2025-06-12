
import { Product } from '@/mockApi/products';
import api from './api';

const mapApiToProduct = (apiProduct: any): Product => {
  return {
    id: apiProduct.product_id,
    name: apiProduct.mix_of_products,
    brandDetails: apiProduct.brand,
    imageName: apiProduct.product_image || '',
    description_detail: apiProduct.description_detail || 'Descrição não disponível.',
    characteristics: apiProduct.characteristics || [],
    lactoseInfo: apiProduct.lactoseInfo || 'Não informado',
    sugarType: apiProduct.sugarType || 'Não informado',
    glutenInfo: apiProduct.glutenInfo || 'Não informado',
    availability: apiProduct.availability || 'Não informado',
    leadTime: apiProduct.leadTime || 'Não informado',
    shelfLife: apiProduct.shelfLife || 'Não informado',
    certificates: apiProduct.certificates || [],
    awards: apiProduct.awards || [],
    packagingType: apiProduct.packagingType || 'Não informado',
  };
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/product');
    if (response.data && Array.isArray(response.data)) {
      return response.data.map(mapApiToProduct);
    }
    return [];
  } catch (error) {
    console.error("Erro ao buscar produtos da API:", error);
    throw new Error('Não foi possível carregar os produtos.');
  }
};


export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
  
    const response = await api.get(`/product/${productId}`);
    
    if (response.data) {
      
      const product = mapApiToProduct(response.data);
      return product;
    }
    
    return null; 
  } catch (error) {
    console.error(`Erro ao buscar produto com ID ${productId}:`, error);
    throw new Error('Não foi possível carregar os detalhes do produto.');
  }
};