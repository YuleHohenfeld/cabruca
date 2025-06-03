import { getMockProductById, OrderDetails, placeMockOrder, Product } from '@/mockApi/products';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Alert, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';

const screenLogo = require('./assets/logo.png');


export default function PedirProdutoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ productId?: string }>();
  const { productId } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  const currencies = [ { label: 'USD', value: 'USD' }, { label: 'BRL', value: 'BRL' }, { label: 'EUR', value: 'EUR' }];
  const [cambio, setCambio] = useState("USD");
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
          } else { Alert.alert("Erro", response.message || "Produto não encontrado."); }
        } catch (error) { Alert.alert("Erro", "Não foi possível carregar dados do produto."); }
        finally { setIsLoadingProduct(false); }
      };
      fetchProductData();
    } else { Alert.alert("Erro", "ID do produto não fornecido para o pedido."); setIsLoadingProduct(false); }
  }, [productId]);

  useEffect(() => {
    const numQuantidade = parseFloat(String(quantidade).replace(',', '.'));
    const numPrecoFob = parseFloat(String(precoFob).replace(',', '.'));
    if (!isNaN(numQuantidade) && !isNaN(numPrecoFob) && numQuantidade > 0 && numPrecoFob > 0) {
      setValorTotal((numQuantidade * numPrecoFob).toFixed(2).replace('.', ','));
    } else if (quantidade === "" || precoFob === "") { setValorTotal(""); }
  }, [quantidade, precoFob]);

  const handlePlaceOrder = async () => {
    Keyboard.dismiss();
    if (!product) { Alert.alert("Erro", "Dados do produto não carregados."); return; }
    if (!quantidade.trim() || isNaN(parseFloat(String(quantidade).replace(',', '.'))) || parseFloat(String(quantidade).replace(',', '.')) <= 0) {
      Alert.alert("Quantidade Inválida", "Insira uma quantidade válida."); return;
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
      requestedBy: "Admin App User", 
    };

    try {
      const response = await placeMockOrder(orderDetails);
      if (response.success) {
        Alert.alert("Pedido Realizado!", response.message);
        setQuantidade(""); setBox(""); 
        router.push('/pedidosScreen'); 
      } else { Alert.alert("Falha no Pedido", response.message || "Não foi possível realizar o pedido."); }
    } catch (error) { Alert.alert("Erro no Pedido", "Ocorreu um problema ao processar seu pedido."); }
    finally { setIsPlacingOrder(false); }
  };

  const loadImageSource = (imageName?: string): ReturnType<typeof require> | null => {
    const imageMap: { [key: string]: ReturnType<typeof require> } = {
      'meioamargoamaro.png': require('./assets/meioamargoamaro.png'),
      'aoleite.png': require('./assets/aoleite.png'),
      'amaro2.png': require('./assets/amaro2.png'),
      'demeter.png': require('./assets/demeter.png'),
    };
    if (imageName && imageMap[imageName]) { return imageMap[imageName]; }
    return null;
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

  const productSpecificImageSource = loadImageSource(product.imageName);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Stack.Screen options={{title: `Pedir: ${product.name.substring(0, 18)}${product.name.length > 18 ? '...' : ''}`, headerBackTitle: 'Voltar', headerStyle: { backgroundColor: '#01923F' }, headerTintColor: '#FFA500', }} />
          <Image source={screenLogo} style={styles.logo} resizeMode="contain" />
          <View style={styles.card}>
            <View style={styles.productImageContainer}>
              {productSpecificImageSource ? (<Image source={productSpecificImageSource} style={styles.productImage} resizeMode="contain" />) 
              : (<View style={styles.noImageAvailable}><Text style={styles.noImageText}>Sem Imagem</Text></View>)}
            </View>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.row}><Text style={styles.label}>Câmbio:</Text><TouchableOpacity style={[styles.input, styles.pickerInput]} onPress={() => !isPlacingOrder && setShowCurrencyModal(true)} disabled={isPlacingOrder}><Text style={styles.pickerText}>{cambio}</Text><Text style={styles.pickerArrow}>▼</Text></TouchableOpacity></View>
            <View style={styles.row}><Text style={styles.label}>Preço Fob/Unid:</Text><TextInput style={styles.input} value={precoFob} onChangeText={setPrecoFob} keyboardType="numeric" placeholder="Ex: 38,30" editable={!isPlacingOrder} /></View>
            <View style={styles.row}><Text style={styles.label}>Quantidade:</Text><TextInput style={styles.input} value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" placeholder="Ex: 90" editable={!isPlacingOrder} /></View>
            <View style={styles.row}><Text style={styles.label}>Valor Total:</Text><TextInput style={[styles.input, styles.inputDisabled]} value={valorTotal} editable={false} /></View>
            <View style={styles.row}><Text style={styles.label}>BOX:</Text><TextInput style={styles.input} value={box} onChangeText={setBox} keyboardType="numeric" placeholder="Ex: 1" editable={!isPlacingOrder} /></View>
            <TouchableOpacity style={[styles.button, isPlacingOrder && styles.buttonDisabled]} onPress={handlePlaceOrder} disabled={isPlacingOrder}>
              {isPlacingOrder ? (<ActivityIndicator color="#FFFFFF" size="small" />) : (<Text style={styles.buttonText}>Confirmar Pedido</Text>)}
            </TouchableOpacity>
          </View>
          <Modal animationType="slide" transparent={true} visible={showCurrencyModal} onRequestClose={() => setShowCurrencyModal(false)}>
            <TouchableWithoutFeedback onPress={() => setShowCurrencyModal(false)}>
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback><View style={styles.modalContent}><Text style={styles.modalTitle}>Selecione o Câmbio</Text>
                  {currencies.map((currency) => (<TouchableOpacity key={currency.value} style={[styles.modalOption, cambio === currency.value && styles.modalOptionSelected]} onPress={() => { setCambio(currency.value); setShowCurrencyModal(false); }}>
                      <Text style={[styles.modalOptionText, cambio === currency.value && styles.modalOptionTextSelected]}>{currency.label}</Text>
                  </TouchableOpacity>))}
                  <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowCurrencyModal(false)}><Text style={styles.modalCloseText}>Cancelar</Text></TouchableOpacity>
                </View></TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  keyboardAvoidingContainer: { flex: 1, backgroundColor: '#01923F' },
  baseContainer: { flex: 1, backgroundColor: '#01923F' },
  scrollContainer: { flexGrow: 1, alignItems: 'center', paddingVertical: 10, paddingTop: 5 },
  centeredContent: { justifyContent: 'center', alignItems: 'center', flex:1, backgroundColor: '#01923F'},
  loadingText: { color: '#FFFFFF', marginTop: 10, fontSize: 16 },
  errorText: { color: '#FFFFFF', fontSize: 16, textAlign: 'center' },
  logo: { width: 160, height: 80, resizeMode: 'contain', marginBottom: 5 },
  card: { width: '90%', maxWidth: 350, padding: 15, backgroundColor: '#59A752', borderRadius: 12, alignItems: 'center', marginTop: 5, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2, },
  productImageContainer: { width: 90, height: 90, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 10, borderRadius: 8, borderWidth: 1, borderColor: '#E0E0E0', },
  productImage: { width: '90%', height: '90%', resizeMode: 'contain', },
  noImageAvailable: { width: 90, height: 90, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E0E0E0', borderRadius: 8, },
  noImageText: { color: '#888888', fontSize: 11, fontStyle: 'italic', textAlign: 'center' },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 15, textAlign: 'center', },
  row: { flexDirection: 'row', marginVertical: 6, alignItems: 'center', justifyContent: 'space-between', width: '100%', },
  label: { fontSize: 14, color: '#FFFFFF', width: '42%', fontWeight: '500', },
  input: { height: 40, borderColor: '#BDBDBD', borderWidth: 1, paddingHorizontal: 10, width: '56%', borderRadius: 6, color: '#333333', backgroundColor: '#FFFFFF', fontSize: 14, },
  inputDisabled: { backgroundColor: '#E9E9E9', color: '#777777', },
  pickerInput: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
  pickerText: { color: '#333333', fontSize: 14, },
  pickerArrow: { color: '#666666', fontSize: 16, }, 
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '85%', maxWidth: 320 },
  modalTitle: { fontSize: 19, fontWeight: '600', marginBottom: 20, textAlign: 'center', color: '#333' },
  modalOption: { paddingVertical: 14, marginVertical: 6, backgroundColor: '#f0f0f0', borderRadius: 8 },
  modalOptionSelected: { backgroundColor: '#01923F' },
  modalOptionText: { fontSize: 16, textAlign: 'center', color: '#444' },
  modalOptionTextSelected: { color: '#fff', fontWeight: 'bold' },
  modalCloseButton: { marginTop: 20, padding: 14, backgroundColor: '#ddd', borderRadius: 8 },
  modalCloseText: { fontSize: 16, textAlign: 'center', color: '#555', fontWeight: '500' },
  button: { width: '100%', paddingVertical: 14, backgroundColor: '#FFAA39', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 15, },
  buttonDisabled: { backgroundColor: '#FFC87A', },
  buttonText: { fontSize: 16, color: '#FFFFFF', fontWeight: 'bold', },
});