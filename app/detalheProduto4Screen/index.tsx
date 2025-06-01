import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
   const router = useRouter();
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
    

      <Image 
        source={require('./assets/logo.png')} 
        style={styles.externalLogo}
        resizeMode="contain"
      />

      <View style={styles.card}>
        <Image 
          source={require('./assets/demeter.png')} 
          style={styles.productImage}
          resizeMode="contain"
        />

        <Text style={styles.productDescription}>Chocolate demeter</Text>
        <Text style={styles.productBrand}>Lacta Amaro - 40% cacau</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Dados do Produto:</Text>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>- Descrição</Text>
          <Text style={styles.dataLabel}>- Característica</Text>
          <Text style={styles.dataLabel}>- Lactose</Text>
          <Text style={styles.dataLabel}>- Tipo de açúcar</Text>
          <Text style={styles.dataLabel}>- Glúten</Text>
          <Text style={styles.dataLabel}>- Disponibilidade[Volume()]</Text>
          <Text style={styles.dataLabel}>- Lead Time</Text>
          <Text style={styles.dataLabel}>- Validade</Text>
          <Text style={styles.dataLabel}>- Certificados</Text>
          <Text style={styles.dataLabel}>- Premiações</Text>
          <Text style={styles.dataLabel}>- Tipo de embalagem gramatura</Text>
        </View>
        <View style={styles.divider} />


        <TouchableOpacity style={styles.buyButton} onPress={() => router.push('/pedirProduto4Screen')}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01923F',
    padding: 10, 
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 1,
    backgroundColor: '#FFAA39',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  externalLogo: {
    width: '90%', 
    height: 140,
    marginBottom: 50,
  },
  card: {
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  padding: 15,
  width: '85%', 
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  marginTop: -55, 
},
  divider: {
    height: 1,
    backgroundColor: '#01923F',
    width: '100%',
    marginVertical: 10,
    opacity: 0.5,
  },
  productImage: {
    width: 100, 
    height: 100,
    marginVertical: 8,
    alignSelf: 'center',
  },
  productDescription: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
    marginBottom: 8,
  },
  dataContainer: {
    marginLeft: 8,
  },
  dataLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    marginBottom: 4,
  },
  buyButton: {
    backgroundColor: '#FFAA39',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
});