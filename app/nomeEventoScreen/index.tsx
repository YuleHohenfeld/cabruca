

import { EventReport, EventReportProduct, submitMockEventReport } from '@/mockApi/events';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const cambioOptions = [
  { label: 'USD', value: 'USD' },
  { label: 'BRL', value: 'BRL' },
  { label: 'EUR', value: 'EUR' },
];


const Field = ({ label, placeholder, value, onChangeText, keyboardType = 'default', editable = true, multiline = false, numberOfLines = 1 }: {
  label: string;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: any;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>{label}:</Text>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#A0A0A0"
      style={[styles.fieldInput, !editable && styles.fieldInputDisabled, multiline && styles.textAreaStyle]}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      editable={editable}
      multiline={multiline}
      numberOfLines={multiline ? numberOfLines : 1}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
  </View>
);


const ProductInputCard = ({
  index,
  productData,
  onProductChange,
  onRemoveProduct,
  setShowModalForProduct,
}: {
  index: number;
  productData: Partial<EventReportProduct>;
  onProductChange: (index: number, field: keyof EventReportProduct, value: string) => void;
  onRemoveProduct: (index: number) => void;
  setShowModalForProduct: (index: number) => void;
}) => (
  <View style={styles.productInputCard}>
    <View style={styles.productCardHeader}>
      <Text style={styles.productCardTitle}>{`Produto ${index + 1}`}</Text>
    
      {index > 0 && (
        <TouchableOpacity onPress={() => onRemoveProduct(index)} style={styles.removeProductButton}>
          <Text style={styles.removeProductButtonText}>Remover Produto</Text>
        </TouchableOpacity>
      )}
    </View>
    <Field
      label="Nome do Produto"
      placeholder="Ex: Chocolate X"
      value={productData.name}
      onChangeText={(text) => onProductChange(index, 'name', text)}
    />
    <Field
      label="Quantidade"
      placeholder="Ex: 90"
      value={productData.quantity}
      onChangeText={(text) => onProductChange(index, 'quantity', text)}
      keyboardType="numeric"
    />
    <Text style={styles.fieldLabel}>Câmbio:</Text>
    <TouchableOpacity
      style={styles.cambioButton}
      onPress={() => setShowModalForProduct(index)} 
    >
      <Text style={styles.cambioButtonText}>{productData.exchange || 'Selecione'}</Text>
      <Text style={styles.cambioButtonArrow}>▼</Text>
    </TouchableOpacity>
  </View>
);


export default function FormularioEventoScreen() {
  const router = useRouter();

  const [eventName, setEventName] = useState("");
  const [eventCityCountry, setEventCityCountry] = useState("");
  const [eventDate, setEventDate] = useState(""); 
  const [eventType, setEventType] = useState("");
  const [producerName, setProducerName] = useState(""); 


  const initialProduct = (): Partial<EventReportProduct> => ({ name: '', quantity: '', exchange: 'USD' });
  const [products, setProducts] = useState<Partial<EventReportProduct>[]>([initialProduct()]); 


  const [cdp, setCdp] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [currentProductIndexForModal, setCurrentProductIndexForModal] = useState<number | null>(null); 


  const handleProductChange = (index: number, field: keyof EventReportProduct, value: string) => {
    const updatedProducts = products.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    setProducts(updatedProducts);
  };

 
  const addProductField = () => {
    setProducts(prevProducts => [...prevProducts, initialProduct()]);
  };


  const removeProductField = (indexToRemove: number) => {
   
    if (products.length > 1) {
      setProducts(prevProducts => prevProducts.filter((_, index) => index !== indexToRemove));
    } else {
      Alert.alert("Ação Inválida", "É necessário manter pelo menos um produto no relatório.");
    }
  };


  const handleCurrencyChangeForProduct = (currencyValue: string) => {
    if (currentProductIndexForModal !== null) {
      handleProductChange(currentProductIndexForModal, 'exchange', currencyValue);
    }
    setShowCurrencyModal(false);
    setCurrentProductIndexForModal(null);
  };

 
  const openCurrencyModalForProduct = (index: number) => {
    setCurrentProductIndexForModal(index);
    setShowCurrencyModal(true);
  };

 
  const handleSubmitReport = async () => {
    Keyboard.dismiss();
    if (!eventName.trim()) {
      Alert.alert("Campo Obrigatório", "O Nome do Evento é obrigatório.");
      return;
    }

    const validProducts = products.filter(
      (p): p is EventReportProduct => !!(p.name && p.name.trim() && p.quantity && p.quantity.trim() && p.exchange)
    );

    if (validProducts.length === 0 && products.some(p => p.name || p.quantity)) {
        Alert.alert("Produtos Incompletos", "Preencha nome, quantidade e câmbio para todos os produtos adicionados, ou remova os produtos vazios.");
        return;
    }


    setIsLoading(true);
    const reportData: Omit<EventReport, 'id' | 'createdAt' | 'reportId' | 'registrationDate'> & {responsible?: string} = {
      eventName,
      eventCityCountry,
      eventDate,
      eventType,
      producerName,
      products: validProducts, 
      cdp,
      totalValue,
      description,
      responsible: "Admin Logado (Mock)", 
    };

    try {
      const response = await submitMockEventReport(reportData);
      if (response.success && response.report?.id) { 
        Alert.alert("Sucesso!", response.message);
       
        setEventName(""); setEventCityCountry(""); setEventDate(""); setEventType(""); setProducerName("");
        setProducts([initialProduct()]);
        setCdp(""); setTotalValue(""); setDescription("");

  
        router.push({
          pathname: '/relatorioEventos2Screen', 
          params: { reportId: response.report.id }
        });
      } else {
        Alert.alert("Falha ao Salvar", response.message || "Não foi possível salvar o relatório.");
      }
    } catch (error) {
      console.error("Erro ao submeter relatório:", error);
      Alert.alert("Erro", "Ocorreu um problema ao enviar o relatório.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
     
      <Stack.Screen
        options={{
          title: 'Novo Relatório',
          headerStyle: { backgroundColor: '#01923F' },
          headerTintColor: '#FFFFFF', 
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <View style={styles.topBar}>
        <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain"/>
      </View>

      <Text style={styles.pageTitle}>Adicionar Relatório de Missão/Evento</Text>

  
      <Field label="Nome do Evento" placeholder="Digite o nome do evento" value={eventName} onChangeText={setEventName} />
      <Field label="Cidade, País" placeholder="Ex: Paris, França" value={eventCityCountry} onChangeText={setEventCityCountry} />
      <Field label="Data do Evento" placeholder="DD/MM/AAAA" value={eventDate} onChangeText={setEventDate} />
      <Field label="Tipo de Evento" placeholder="Ex: Feira Internacional" value={eventType} onChangeText={setEventType} />
      <Field label="Produtor Principal (se houver)" placeholder="Nome do produtor" value={producerName} onChangeText={setProducerName} />
      
 
      <Text style={styles.sectionHeader}>Produtos da Missão</Text>
      {products.map((product, index) => (
        <ProductInputCard
          key={index} 
          index={index}
          productData={product}
          onProductChange={handleProductChange}
          onRemoveProduct={removeProductField}
          setShowModalForProduct={openCurrencyModalForProduct}
        />
      ))}

      
      <TouchableOpacity style={styles.addProductButton} onPress={addProductField}>
        <Text style={styles.addProductButtonText}>+ Adicionar Produto</Text>
      </TouchableOpacity>

     
      <Field label="CDP (Custo de Desenvolvimento de Produto)" placeholder="Ex: 1500,00" value={cdp} onChangeText={setCdp} keyboardType="numeric"/>
      <Field label="Valor Total Estimado" placeholder="Ex: 10000,00" value={totalValue} onChangeText={setTotalValue} keyboardType="numeric"/>

      <Text style={styles.fieldLabel}>Descrição / Observações:</Text>
      <TextInput
        placeholder="Detalhes sobre o evento, resultados, etc."
        placeholderTextColor="#A0A0A0"
        style={styles.textArea}
        multiline
        numberOfLines={5}
        value={description}
        onChangeText={setDescription}
      />


      <TouchableOpacity
        style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
        onPress={handleSubmitReport}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.sendButtonText}>Salvar e Ver Detalhes</Text>}
      </TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={showCurrencyModal && currentProductIndexForModal !== null}
        onRequestClose={() => { setShowCurrencyModal(false); setCurrentProductIndexForModal(null); }}
      >
        <TouchableWithoutFeedback onPress={() => { setShowCurrencyModal(false); setCurrentProductIndexForModal(null); }}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Câmbio (Produto {currentProductIndexForModal !== null ? currentProductIndexForModal + 1 : ''})</Text>
                {cambioOptions.map((currency) => (
                    <TouchableOpacity
                    key={currency.value}
                    style={[
                        styles.modalOption,
                        products[currentProductIndexForModal!]?.exchange === currency.value && styles.modalOptionSelected // Verifica o câmbio do produto atual
                    ]}
                    onPress={() => handleCurrencyChangeForProduct(currency.value)}
                    >
                    <Text style={[
                        styles.modalOptionText,
                        products[currentProductIndexForModal!]?.exchange === currency.value && styles.modalOptionTextSelected
                    ]}>
                        {currency.label}
                    </Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => { setShowCurrencyModal(false); setCurrentProductIndexForModal(null); }}>
                    <Text style={styles.modalCloseText}>Cancelar</Text>
                </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  keyboardAvoidingContainer: { flex: 1 },
  scrollView: { flex: 1, backgroundColor: '#01923F' },
  scrollViewContent: { paddingHorizontal: 20, paddingVertical: 15, paddingBottom: 40 },
  topBar: { alignItems: 'center', marginBottom: 10 },
  logo: { height: 100, width: 180, resizeMode: 'contain'},
  pageTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 5 },
  sectionHeader: { color: '#FFFFFF', fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 10, borderTopColor: 'rgba(255,255,255,0.3)', borderTopWidth: 1, paddingTop: 15 },
  fieldContainer: { marginBottom: 14 },
  fieldLabel: { color: 'white', fontSize: 15, marginBottom: 6, fontWeight: '500' },
  fieldInput: { backgroundColor: 'white', borderRadius: 8, paddingHorizontal: 12, height: 48, fontSize: 15, color: '#333', borderWidth:1, borderColor:'#DDE2E5' },
  fieldInputDisabled: { backgroundColor: '#e9e9e9', color: '#888' },
  textAreaStyle: { height: 100, textAlignVertical: 'top', paddingTop: 10 },
  productInputCard: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: 15, marginBottom: 15, borderColor:'rgba(255,255,255,0.2)', borderWidth:1 },
  productCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10},
  productCardTitle: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  removeProductButton: { backgroundColor: '#E74C3C', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5},
  removeProductButtonText: { color: 'white', fontWeight: 'bold', fontSize: 12},
  addProductButton: { borderColor: '#FFAA39', borderWidth: 1.5, borderStyle:'dashed', paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginVertical: 10, backgroundColor:'rgba(255,170,57,0.1)' },
  addProductButtonText: { color: '#FFAA39', fontSize: 15, fontWeight: 'bold' },
  cambioButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 48, backgroundColor: '#FFFFFF', borderRadius: 8, paddingHorizontal: 12, borderWidth:1, borderColor:'#DDE2E5' },
  cambioButtonText: { fontSize: 15, color: '#333' },
  cambioButtonArrow: { fontSize: 16, color: '#333' },
  textArea: { backgroundColor: 'white', borderRadius: 8, padding: 12, height: 100, fontSize: 15, color: '#333', textAlignVertical: 'top', borderWidth:1, borderColor:'#DDE2E5', marginBottom:20},
  sendButton: { backgroundColor: '#FFAA39', paddingVertical: 15, borderRadius: 25, alignItems: 'center', marginTop: 15 },
  sendButtonDisabled: { backgroundColor: '#FFD18C'},
  sendButtonText: { fontSize: 17, color: '#FFFFFF', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '85%', maxWidth: 320 },
  modalTitle: { fontSize: 19, fontWeight: '600', marginBottom: 20, textAlign: 'center', color: '#333' },
  modalOption: { paddingVertical: 14, marginVertical: 6, backgroundColor: '#f0f0f0', borderRadius: 8 },
  modalOptionSelected: { backgroundColor: '#01923F' },
  modalOptionText: { fontSize: 16, textAlign: 'center', color: '#444' },
  modalOptionTextSelected: { color: '#fff', fontWeight: 'bold' },
  modalCloseButton: { marginTop: 20, padding: 14, backgroundColor: '#ddd', borderRadius: 8 },
  modalCloseText: { fontSize: 16, textAlign: 'center', color: '#555', fontWeight: '500' }
});