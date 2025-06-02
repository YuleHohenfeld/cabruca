import { getMockProducts, Product } from '@/mockApi/products';
import { useRouter } from 'expo-router';
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

const screenLogo = require('./assets/logo.png'); 

const ProductCard = ({ product, onNavigate }: { product: Product; onNavigate: () => void }) => {
  const imageMap: { [key: string]: ReturnType<typeof require> } = {
    'meioamargoamaro.png': require('./assets/meioamargoamaro.png'),
    'aoleite.png': require('./assets/aoleite.png'),
    'amaro2.png': require('./assets/amaro2.png'),
    'demeter.png': require('./assets/demeter.png'),
  };
  const placeholderImage = require('./assets/placeHolder.png'); 
  const productImageSource = imageMap[product.imageName] || placeholderImage;

  return (
    <View style={styles.productCard}>
      <View style={styles.textContent}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productBrand}>{product.brandDetails}</Text>
      </View>
      <View style={styles.bottomContent}>
        <Image source={productImageSource} style={styles.productImage} resizeMode="contain" />
        <TouchableOpacity style={styles.button} onPress={onNavigate}>
          <Text style={styles.buttonText}>SAIBA MAIS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProdutosScreen = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getMockProducts();
        if (response.success) {
          setProducts(response.products);
        } else {
          Alert.alert("Erro", "Não foi possível carregar os produtos.");
        }
      } catch (err) {
        Alert.alert("Erro", "Ocorreu um problema ao buscar os produtos.");
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const navigateToDetail = (productId: string) => {
    router.push({
      pathname: '/detalheprodutoScreen',
      params: { productId },
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={{ color: 'white', marginTop: 10 }}>Carregando Produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={screenLogo} style={styles.logo} resizeMode="contain" />
      </View>
      <Text style={styles.sectionTitle}>PRODUTOS</Text>
      <ScrollView contentContainerStyle={styles.productContainer}>
        {products.length === 0 && !isLoading ? (
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
            Nenhum produto encontrado.
          </Text>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={() => navigateToDetail(product.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01923F',
    paddingTop: 20, 
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10, 
  },
  logo: {
    width: 280,
        transform: [{ translateX: -12 }],
    height: 130
  },
  sectionTitle: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 10, 
  },
  productContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: '#59A752',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15, 
  },
  textContent: {
    marginBottom: 10,
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  productBrand: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    backgroundColor: '#DADBD9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default ProdutosScreen;
