import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const cambioOptions = [
  { label: 'USD', value: 'USD' },
  { label: 'BRL', value: 'BRL' },
  { label: 'EUR', value: 'EUR' },
];

export default function App() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  const getLabelByValue = (value: string): string => {
    const option = cambioOptions.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#01923F', padding: 16 }}>
      <View style={styles.topBar}>
        <Image
          source={require('./assets/logo.png')} 
          style={styles.logo}
        />
      </View>

      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>NOME DO EVENTO</Text>
      <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', marginBottom: 20 }}>Cidade, país</Text>

      <Field label="ID Relatório" placeholder="(automatico)" />
      <Field label="Data de registro" placeholder="(automatico)" />
      <Field label="Responsável" placeholder="(automaticoADM)" />
      <Field label="Data" placeholder="(automaticoData)" />
      <Field label="Tipo" placeholder="(automaticoEvento)" />
      <Field label="Produtor" placeholder="(automaticoProdutor)" />
      
      <ProductCard 
        title="Produto 1" 
        quantidade="90" 
        cambio={selectedCurrency} 
        setCambio={setSelectedCurrency}
        showModal={showCurrencyModal}
        setShowModal={setShowCurrencyModal}
        getLabelByValue={getLabelByValue}
      />
      <ProductCard 
        title="Produto 2" 
        cambio={selectedCurrency} 
        setCambio={setSelectedCurrency}
        showModal={showCurrencyModal}
        setShowModal={setShowCurrencyModal}
        getLabelByValue={getLabelByValue}
      />
      <ProductCard 
        title="Produto 3" 
        cambio={selectedCurrency} 
        setCambio={setSelectedCurrency}
        showModal={showCurrencyModal}
        setShowModal={setShowCurrencyModal}
        getLabelByValue={getLabelByValue}
      />

      <Field label="CDP" placeholder="" />
      <Field label="Valor Total" placeholder="" />

      <Text style={{ color: 'white', fontSize: 16, marginBottom: 4 }}>Descrição:</Text>
      <TextInput
        placeholder="Descrição"
        placeholderTextColor="#ccc"
        style={{ backgroundColor: 'white', borderRadius: 8, padding: 10, height: 100, marginBottom: 20 }}
        multiline
      />

      <TouchableOpacity style={styles.sendButton} onPress={() => {}}>
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>

     
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCurrencyModal}
        onRequestClose={() => setShowCurrencyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Câmbio</Text>
            {cambioOptions.map((currency) => (
              <TouchableOpacity
                key={currency.value}
                style={[
                  styles.modalOption,
                  selectedCurrency === currency.value && styles.modalOptionSelected
                ]}
                onPress={() => {
                  setSelectedCurrency(currency.value);
                  setShowCurrencyModal(false);
                }}
              >
                <Text style={[
                  styles.modalOptionText,
                  selectedCurrency === currency.value && styles.modalOptionTextSelected
                ]}>
                  {currency.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowCurrencyModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const Field = ({ label, placeholder }: { label: string; placeholder: string }) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={{ color: 'white', fontSize: 16, marginBottom: 4 }}>{label}:</Text>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#ccc"
      style={{ backgroundColor: 'white', borderRadius: 8, padding: 10 }}
    />
  </View>
);

const ProductCard = ({ 
  title, 
  quantidade = '', 
  cambio = '', 
  setCambio, 
  showModal, 
  setShowModal, 
  getLabelByValue 
}: { 
  title: string; 
  quantidade?: string; 
  cambio?: string; 
  setCambio: (value: string) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  getLabelByValue: (value: string) => string;
}) => (
  <View style={{ backgroundColor: '#44785A', borderRadius: 12, padding: 12, marginBottom: 16 }}>
    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{title}</Text>
    <Field label="Nome" placeholder="(automaticoProduto)" />
    <Field label="Quantidade" placeholder={quantidade || '90'} />
    
    <Text style={{ color: 'white', fontSize: 16, marginBottom: 4 }}>Câmbio:</Text>
    <TouchableOpacity
      style={styles.cambioButton}
      onPress={() => setShowModal(true)}
      activeOpacity={0.7}
    >
      <Text style={styles.cambioButtonText}>{getLabelByValue(cambio)}</Text>
      <Text style={styles.cambioButtonArrow}>▼</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: -8,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFAA39',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  logo: {
    height: 140,
    width: 200,
    resizeMode: 'contain',
    marginLeft: -34,
  },
  cambioButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  cambioButtonText: {
    fontSize: 16,
    color: '#000',
  },
  cambioButtonArrow: {
    fontSize: 18,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalOption: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: '#F5F5F5',
  },
  modalOptionSelected: {
    backgroundColor: '#01923F',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
  modalOptionTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
  },
  modalCloseText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  sendButton: {
    backgroundColor: '#FFAA39',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  sendButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});