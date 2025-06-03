import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
  View
} from 'react-native';

const cambioOptions = [
  { label: 'USD', value: 'USD' },
  { label: 'BRL', value: 'BRL' },
  { label: 'EUR', value: 'EUR' },
];

const EventReportScreen = () => {
  const router = useRouter();
  const [cambio, setCambio] = useState('USD');
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [date, setDate] = useState('');

  const getLabelByValue = (value: string): string => {
    const option = cambioOptions.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  const formatDate = (text: string) => {
    
    const cleanText = text.replace(/\D/g, '');
    
    
    let formattedText = cleanText;
    if (cleanText.length >= 2) {
      formattedText = cleanText.substring(0, 2) + '/' + cleanText.substring(2);
    }
    if (cleanText.length >= 4) {
      formattedText = cleanText.substring(0, 2) + '/' + cleanText.substring(2, 4) + '/' + cleanText.substring(4, 8);
    }
    
    return formattedText;
  };

  const handleDateChange = (text: string) => {
    const formatted = formatDate(text);
    setDate(formatted);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image 
            source={require('./assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>RELATÓRIO DE EVENTO</Text>

          <TextInput style={styles.input} placeholder="NOME DO EVENTO" placeholderTextColor="#000000" />
          
          <TextInput 
            style={styles.input} 
            placeholder="DD/MM/AAAA" 
            placeholderTextColor="#000000"
            value={date}
            onChangeText={handleDateChange}
            keyboardType="numeric"
            maxLength={10}
          />
          
          <TextInput style={styles.input} placeholder="NOME DO EVENTO" placeholderTextColor="#000000" />
          
          <View style={styles.selectContainer}>
            <Text style={styles.label}>Pais:</Text>
            <TextInput style={styles.input} placeholder="EX: BRASIL" placeholderTextColor="#000000" />
          </View>

          <View style={styles.selectContainer}>
            <Text style={styles.label}>Cidade:</Text>
            <TextInput style={styles.input} placeholder="EX: Salvador" placeholderTextColor="#000000" />
          </View>

          <View style={styles.innerCard}>
            <View style={styles.selectContainer}>
              <Text style={styles.label}>Produto(s):</Text>
              <TextInput 
                style={styles.productInput} 
                placeholder="CHOCOLATE 55% COCOA WITH CUPUASSU 80G" 
                placeholderTextColor="#000000"
                multiline={true}
                numberOfLines={2}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.selectContainer}>
              <Text style={styles.label}>Quantidade:</Text>
              <TextInput style={styles.input} placeholder="90" placeholderTextColor="#000000" />
            </View>

            <View style={styles.selectContainer}>
              <Text style={styles.label}>Câmbio:</Text>

              <TouchableOpacity
                style={styles.cambioButton}
                onPress={() => setShowCurrencyModal(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.cambioButtonText}>{getLabelByValue(cambio)}</Text>
                <Text style={styles.cambioButtonArrow}>▼</Text>
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
                          cambio === currency.value && styles.modalOptionSelected
                        ]}
                        onPress={() => {
                          setCambio(currency.value);
                          setShowCurrencyModal(false);
                        }}
                      >
                        <Text style={[
                          styles.modalOptionText,
                          cambio === currency.value && styles.modalOptionTextSelected
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
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.addButton} onPress={() => router.push('/nomeEventoScreen')}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TextInput style={styles.input} placeholder="Condição de Pagamento (CIF ou FOB)" placeholderTextColor="#000000" />
          <TextInput style={styles.input} placeholder="Descrição" placeholderTextColor="#000000" multiline={true} numberOfLines={4} />

          <TouchableOpacity style={styles.sendButton} onPress={() => {}}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#01923F',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 20,
    paddingBottom: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 140,
    left: -14,
    marginTop: -17,
  },
  card: {
    backgroundColor: '#59A752',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  innerCard: {
    backgroundColor: '#44785A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  productInput: {
    minHeight: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  selectContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
  },
  cambioButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
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
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  addButton: {
    backgroundColor: '#FFAA39',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sendButton: {
    backgroundColor: '#FFAA39',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default EventReportScreen;