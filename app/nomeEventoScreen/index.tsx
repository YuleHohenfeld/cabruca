import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [selectedCurrency, setSelectedCurrency] = useState('US'); 

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

    
      <ProductCard title="Produto 1" quantidade="90" cambio={selectedCurrency} setCambio={setSelectedCurrency} />
      <ProductCard title="Produto 2" cambio={selectedCurrency} setCambio={setSelectedCurrency} />

      <ProductCard title="Produto 3" cambio={selectedCurrency} setCambio={setSelectedCurrency} />

      <Field label="CDP" placeholder="" />
      <Field label="Valor Total" placeholder="" />

      <Text style={{ color: 'white', fontSize: 16, marginBottom: 4 }}>Descrição:</Text>
      <TextInput
        placeholder="Descrição"
        placeholderTextColor="#ccc"
        style={{ backgroundColor: 'white', borderRadius: 8, padding: 10, height: 100, marginBottom: 40 }}
        multiline
      />
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

const ProductCard = ({ title, quantidade = '', cambio = '', setCambio }: { title: string; quantidade?: string; cambio?: string; setCambio: (value: string) => void }) => (
  <View style={{ backgroundColor: '#44785A', borderRadius: 12, padding: 12, marginBottom: 16 }}>
    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{title}</Text>
    <Field label="Nome" placeholder="(automaticoProduto)" />
    <Field label="Quantidade" placeholder={quantidade || '90'} />
    
    <Text style={{ color: 'white', fontSize: 16, marginBottom: 4 }}>Câmbio:</Text>
    <View style={{ backgroundColor: 'white', borderRadius: 8, padding: 10 }}>
      <Picker
        selectedValue={cambio}
        onValueChange={(itemValue) => setCambio(itemValue)} 
      >
        <Picker.Item label="US" value="US" />
        <Picker.Item label="REAL" value="REAL" />
        <Picker.Item label="EUR" value="EUR" />
      </Picker>
    </View>
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
    height: 200,
    resizeMode: 'contain',
    marginLeft: -45, 
  },
});