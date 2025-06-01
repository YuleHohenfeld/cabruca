
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { getMockProductById, Product } from '@/mockApi/products';

const placeholderImage = require('./assets/placeHolder.png');

export default function DetalheProdutoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ productId?: string }>(); 
  const { productId } = params; 
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      console.log(`[DetalheProdutoScreen] Buscando detalhes para o produto ID: ${productId}`);
      const fetchProductDetails = async () => {
        setIsLoading(true);
        try {
          const response = await getMockProductById(productId);
          if (response.success && response.product) {
            setProduct(response.product);
          } else {
            Alert.alert("Erro", response.message || "Produto não encontrado.");
        
          }
        } catch (error) {
          console.error("[DetalheProdutoScreen] Erro ao buscar produto:", error);
          Alert.alert("Erro", "Não foi possível carregar os detalhes do produto.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchProductDetails();
    } else {
    
      Alert.alert("Erro de Navegação", "ID do produto não fornecido.");
      setIsLoading(false);
    }
  }, [productId]); 

  const loadImageSource = (imageName?: string) => {
    const imageMap: { [key: string]: ReturnType<typeof require> } = {
      'meioamargoamaro.png': require('./assets/meioamargoamaro.png'), 
      'aoleite.png': require('./assets/aoleite.png'),
      'amaro2.png': require('./assets/amaro2.png'),
      'demeter.png': require('./assets/demeter.png'),
    
    };
    return imageName && imageMap[imageName] ? imageMap[imageName] : placeholderImage;
  };

  const handleNavigateToPedirProduto = () => {
    if (product) {

      router.push({
        pathname: '/pedirprodutoScreen', 
        params: { productId: product.id },
      });
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.containerBase, styles.centered]}>
       
        <Stack.Screen options={{ title: 'Carregando Produto...' }} />
        <ActivityIndicator size="large" color="#01923F" />
        <Text style={{ marginTop: 10, color: '#333' }}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.containerBase, styles.centered]}>
        <Stack.Screen options={{ title: 'Erro' }} />
        <Text style={styles.errorText}>Produto não encontrado ou ID inválido.</Text>
       
      </View>
    );
  }

  return (
    <ScrollView style={styles.containerBase}>
      <Stack.Screen
        options={{
          title: product.name.substring(0, 20) + (product.name.length > 20 ? '...' : ''), 
          headerBackTitle: 'Voltar', 
          headerStyle: { backgroundColor: '#01923F' },
          headerTintColor: '#FFA500',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      <View style={styles.card}>
        <Image
          source={loadImageSource(product.imageName)}
          style={styles.productImage}
          resizeMode="contain"
        />
        <Text style={styles.productNameText}>{product.name}</Text>
        <Text style={styles.productBrandText}>{product.brandDetails}</Text>
        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Descrição Detalhada:</Text>
        <Text style={styles.dataLabelValue}>{product.description_detail}</Text>
        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Dados do Produto:</Text>
        <View style={styles.dataContainer}>
          {product.characteristics && <Text style={styles.dataLabel}>- Características: <Text style={styles.dataLabelValue}>{product.characteristics.join(', ')}</Text></Text>}
          {product.lactoseInfo && <Text style={styles.dataLabel}>- Lactose: <Text style={styles.dataLabelValue}>{product.lactoseInfo}</Text></Text>}
          {product.sugarType && <Text style={styles.dataLabel}>- Tipo de açúcar: <Text style={styles.dataLabelValue}>{product.sugarType}</Text></Text>}
          {product.glutenInfo && <Text style={styles.dataLabel}>- Glúten: <Text style={styles.dataLabelValue}>{product.glutenInfo}</Text></Text>}
          {product.availability && <Text style={styles.dataLabel}>- Disponibilidade: <Text style={styles.dataLabelValue}>{product.availability}</Text></Text>}
          {product.leadTime && <Text style={styles.dataLabel}>- Lead Time: <Text style={styles.dataLabelValue}>{product.leadTime}</Text></Text>}
          {product.shelfLife && <Text style={styles.dataLabel}>- Validade: <Text style={styles.dataLabelValue}>{product.shelfLife}</Text></Text>}
          {product.certificates && <Text style={styles.dataLabel}>- Certificados: <Text style={styles.dataLabelValue}>{product.certificates.join(', ')}</Text></Text>}
          {product.awards && <Text style={styles.dataLabel}>- Premiações: <Text style={styles.dataLabelValue}>{product.awards.join(', ')}</Text></Text>}
          {product.packagingType && <Text style={styles.dataLabel}>- Tipo de embalagem: <Text style={styles.dataLabelValue}>{product.packagingType}</Text></Text>}
        </View>
        <View style={styles.divider} />

        <TouchableOpacity style={styles.buyButton} onPress={handleNavigateToPedirProduto}>
          <Text style={styles.buyButtonText}>PEDIR ESTE PRODUTO</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerBase: { 
    flex: 1,
    backgroundColor: '#01923F',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    margin: 15, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  productImage: {
    width: '70%', 
    aspectRatio: 1, 
    alignSelf: 'center',
    marginBottom: 15,
  },
  productNameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 5,
  },
  productBrandText: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0', 
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#01923F',
    marginBottom: 10,
  },
  dataContainer: {
    marginLeft: 5, 
  },
  dataLabel: {
    fontSize: 15,
    color: '#444444', 
    marginBottom: 8,
    lineHeight: 22,
  },
  dataLabelValue: { 
    fontWeight: 'normal', 
    color: '#333333',
  },
  buyButton: {
    backgroundColor: '#FFAA39',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F', 
    textAlign: 'center',
  },
});