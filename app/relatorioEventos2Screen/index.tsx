import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const cambioOptions = [
  { label: 'US', value: 'US' },
  { label: 'EUR', value: 'EUR' },
  { label: 'Real', value: 'BRL' },
];

const EventReportScreen = () => {
   const router = useRouter();
  const [cambio, setCambio] = useState('US');
  const [modalVisible, setModalVisible] = useState(false);

  const getLabelByValue = (value: string): string => {
  const option = cambioOptions.find(opt => opt.value === value);
  return option ? option.label : '';
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
          <TextInput style={styles.input} placeholder="XX/XX/XXXX" placeholderTextColor="#000000" />
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
              <TextInput style={styles.input} placeholder="CHOCOLATE 55% COCOA WITH CUPUASSU 80G" placeholderTextColor="#000000" />
            </View>

            <View style={styles.selectContainer}>
              <Text style={styles.label}>Quantidade:</Text>
              <TextInput style={styles.input} placeholder="90" placeholderTextColor="#000000" />
            </View>

            <View style={styles.selectContainer}>
              <Text style={styles.label}>Câmbio:</Text>

              <TouchableOpacity
                style={styles.cambioButton}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.cambioButtonText}>{getLabelByValue(cambio)}</Text>
                <Text style={styles.cambioButtonArrow}>▼</Text>
              </TouchableOpacity>

              <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
              >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                  <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>

                <View style={styles.modalContainer}>
                  {cambioOptions.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={styles.modalOption}
                      onPress={() => {
                        setCambio(option.value);
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.modalOptionText}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
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
    width: 250,
    height: 180,
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
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 5,
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#000',
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