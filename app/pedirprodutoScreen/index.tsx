
import { getMockProductById, OrderDetails, placeMockOrder, Product } from '@/mockApi/products';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const screenLogo = require('./assets/logo.png');
const placeholderProductImage = require('./assets/placeHolder.png'); 

export default function PedirProdutoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ productId?: string }>();
  const { productId } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);


  const [cambio, setCambio] = useState("US");
  const [precoFob, setPrecoFob] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [box, setBox] = useState("");

  useEffect(() => {
    if (productId) {
      const fetchProductData = async () => {
        setIsLoadingProduct(true);
        try {
          const response = await getMockProductById(productId);
          if (response.success && response.product) {
            setProduct(response.product);
        
            setPrecoFob(response.product.defaultPriceFob || "");
            setQuantidade(response.product.defaultQuantity || "");
            setValorTotal(response.product.defaultTotalValue || ""); 
            setBox(response.product.defaultBox || "");
            if(response.product.defaultExchange) setCambio(response.product.defaultExchange);
          } else {
            Alert.alert("Erro", response.message || "Produto não encontrado.");
          }
        } catch (error) {
          Alert.alert("Erro", "Não foi possível carregar dados do produto.");
        } finally {
          setIsLoadingProduct(false);
        }
      };
      fetchProductData();
    } else {
      Alert.alert("Erro", "ID do produto não fornecido para o pedido.");
      setIsLoadingProduct(false);
    }
  }, [productId]);


  useEffect(() => {
    const numQuantidade = parseFloat(String(quantidade).replace(',', '.'));
    const numPrecoFob = parseFloat(String(precoFob).replace(',', '.'));

    if (!isNaN(numQuantidade) && !isNaN(numPrecoFob) && numQuantidade > 0 && numPrecoFob > 0) {
      setValorTotal((numQuantidade * numPrecoFob).toFixed(2).replace('.', ',')); 
    } else if (quantidade === "" || precoFob === "") {
        setValorTotal(""); 
    }
  }, [quantidade, precoFob]);

  const handlePlaceOrder = async () => {
    Keyboard.dismiss();
    if (!product) {
      Alert.alert("Erro", "Dados do produto não carregados. Tente novamente.");
      return;
    }
    if (!quantidade.trim() || isNaN(parseFloat(String(quantidade).replace(',', '.'))) || parseFloat(String(quantidade).replace(',', '.')) <= 0) {
      Alert.alert("Quantidade Inválida", "Por favor, insira uma quantidade válida.");
      return;
    }

    setIsPlacingOrder(true);
    const orderDetails: OrderDetails = {
      productId: product.id,
      productName: product.name,
      exchangeRate: cambio,
      priceFob: precoFob,
      quantity: parseFloat(String(quantidade).replace(',', '.')),
      totalValue: valorTotal,
      boxCount: box,
    };

    try {
      const response = await placeMockOrder(orderDetails);
      if (response.success) {
        Alert.alert("Pedido Realizado!", response.message);
    
        setQuantidade(""); 
        setBox("");
       
      } else {
        Alert.alert("Falha no Pedido", response.message || "Não foi possível realizar o pedido.");
      }
    } catch (error) {
      Alert.alert("Erro no Pedido", "Ocorreu um problema ao processar seu pedido.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const loadImageSource = (imageName?: string) => {
    const imageMap: { [key: string]: ReturnType<typeof require> } = {
      'meioamargoamaro.png': require('./assets/meioamargoamaro.png'),
      'aoleite.png': require('./assets/aoleite.png'),
      'amaro2.png': require('./assets/amaro2.png'),
      'demeter.png': require('./assets/demeter.png'),
    };
    return imageName && imageMap[imageName] ? imageMap[imageName] : placeholderProductImage;
  };

  if (isLoadingProduct) {
    return (
      <View style={[styles.baseContainer, styles.centeredContent]}>
        <Stack.Screen options={{ title: 'Carregando...' }} />
        <ActivityIndicator size="large" color="#01923F" />
        <Text style={styles.loadingText}>Carregando dados do produto...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.baseContainer, styles.centeredContent]}>
        <Stack.Screen options={{ title: 'Erro' }} />
        <Text style={styles.errorText}>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} 
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Stack.Screen
            options={{
              title: `Pedir: ${product.name.substring(0, 20)}${product.name.length > 20 ? '...' : ''}`,
              headerBackTitle: 'Voltar',
              headerStyle: { backgroundColor: '#01923F' },
              headerTintColor: '#FFA500',
            }}
          />
          <Image source={screenLogo} style={styles.logo} resizeMode="contain" />
          <View style={styles.card}>
            <View style={styles.productImageContainer}>
              <Image source={loadImageSource(product.imageName)} style={styles.productImage} resizeMode="contain" />
            </View>
            <Text style={styles.productName}>{product.name}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Câmbio:</Text>
              <TextInput style={styles.input} value={cambio} onChangeText={setCambio} placeholder="Ex: USD" editable={!isPlacingOrder} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Preço Fob/Unid:</Text>
              <TextInput style={styles.input} value={precoFob} onChangeText={setPrecoFob} keyboardType="numeric" placeholder="Ex: 38,30" editable={!isPlacingOrder} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Quantidade:</Text>
              <TextInput style={styles.input} value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" placeholder="Ex: 90" editable={!isPlacingOrder} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Valor Total:</Text>
              <TextInput style={[styles.input, styles.inputDisabled]} value={valorTotal} editable={false} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>BOX:</Text>
              <TextInput style={styles.input} value={box} onChangeText={setBox} keyboardType="numeric" placeholder="Ex: 1" editable={!isPlacingOrder} />
            </View>

            <TouchableOpacity
              style={[styles.button, isPlacingOrder && styles.buttonDisabled]}
              onPress={handlePlaceOrder}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.buttonText}>Confirmar Pedido</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: '#01923F', 
  },
  baseContainer: { 
    flex: 1,
    backgroundColor: '#01923F',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20, 
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
  },
  loadingText: {
      color: '#FFFFFF',
      marginTop: 10,
  },
  errorText: {
      color: '#FFFFFF',
      fontSize: 16,
  },
  logo: {
    width: 200, 
    height: 100, 
    resizeMode: 'contain',
    marginBottom: 15,
  },
  card: {
    width: '90%',
    maxWidth: 340, 
    padding: 20,  
    backgroundColor: '#59A752',
    borderRadius: 12, 
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  productImageContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  productImage: {
    width: '85%',
    height: '85%',
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20, 
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 8, 
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    fontSize: 15,
    color: '#FFFFFF',
    width: '40%', 
    fontWeight: '500',
  },
  input: {
    height: 42,
    borderColor: '#BDBDBD', 
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '58%', 
    borderRadius: 6,
    color: '#333333', 
    backgroundColor: '#FFFFFF',
    fontSize: 15,
  },
  inputDisabled: {
    backgroundColor: '#E9E9E9', 
    color: '#777777',
  },
  button: {
    width: '85%',
    height: 50, 
    backgroundColor: '#FFAA39',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 25, 
  },
  buttonDisabled: {
    backgroundColor: '#FFC87A', 
  },
  buttonText: {
    fontSize: 17, 
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});