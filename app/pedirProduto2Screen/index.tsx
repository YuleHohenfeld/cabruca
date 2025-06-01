import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const App = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
  
      <Image 
        source={require('./assets/logo.png')} 
        style={styles.logo} 
      />
      
      <View style={styles.card}>
        <View style={styles.productImageContainer}>
          <Image 
            source={require('./assets/amaro2.png')} 
            style={styles.productImage} 
          />
        </View>
        
        <Text style={styles.productName}>CHOCOLATE MEIO AMARGO 40% COCOA 80G</Text>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Descrição...Descrição...Descrição...Descrição...Descrição...Descrição
          </Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Câmbio:</Text>
          <TextInput style={styles.input} placeholder="US" />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Preço Fob/Unid:</Text>
          <TextInput style={styles.input} value="38,30" />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Quantidade:</Text>
          <TextInput style={styles.input} value="90" />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Valor Total:</Text>
          <TextInput style={styles.input} value="3.447" />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>BOX:</Text>
          <TextInput style={styles.input} value="1" />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Pedir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#01923F',
    paddingTop: 10,
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 15,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#FFAA39',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
    marginLeft: -2,
  },
  logo: {
    width: 250,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    width: '85%',
    maxWidth: 280,
    padding: 12,
    backgroundColor: '#59A752',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  productImageContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    borderRadius: 8,
  },
  productImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  descriptionContainer: {
    marginVertical: 6,
    padding: 6,
    borderWidth: 1,
    borderColor: '#59A752',
    width: '100%',
    marginBottom: 10,
  },
  description: {
    fontSize: 11,
    color: '#FFFFFF',
    lineHeight: 16,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: 40, 
  },
  label: {
    fontSize: 13,
    marginRight: 8,
    color: '#FFFFFF',
    width: '40%',
  },
  input: {
    height: 36, 
    borderColor: '#59A752',
    borderWidth: 1,
    paddingLeft: 8,
    width: '55%',
    borderRadius: 4,
    color: '#070000',
    backgroundColor: '#FFFFFF',
    fontSize: 14, 
    paddingVertical: 6, 
    textAlignVertical: 'center',
    includeFontPadding: false, 
  },
  button: {
    width: '75%',
    height: 40,
    backgroundColor: '#FFAA39',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;