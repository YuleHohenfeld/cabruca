import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProdutosScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.menuButton} onPress={() => router.back()}>
        <View style={styles.menuButtonInner}>
          <Ionicons name="arrow-back" size={30} color="#FFFFFF" />
        </View>
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('./assets/logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>

      <Text style={styles.sectionTitle}>PRODUTOS</Text>

      <ScrollView contentContainerStyle={styles.productContainer}>
        {/* Produto 1 */}
        <View style={styles.productCard}>
          <View style={styles.textContent}>
            <Text style={styles.productName}>Chocolate meio amargo</Text>
            <Text style={styles.productBrand}>Lacta Amaro - 40% cacau</Text>
          </View>
          <View style={styles.bottomContent}>
            <Image 
              source={require('./assets/meioamargoamaro.png')}
              style={styles.productImage}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>SAIBA MAIS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Produto 2 */}
        <View style={styles.productCard}>
          <View style={styles.textContent}>
            <Text style={styles.productName}>Chocolate ao leite Lacta - 80g</Text>
          </View>
          <View style={styles.bottomContent}>
            <Image 
              source={require('./assets/aoleite.png')}
              style={styles.productImage}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>SAIBA MAIS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Produto 3 */}
        <View style={styles.productCard}>
          <View style={styles.textContent}>
            <Text style={styles.productName}>Chocolate meio amargo</Text>
            <Text style={styles.productBrand}>Lacta Amaro - 40% cacau</Text>
          </View>
          <View style={styles.bottomContent}>
            <Image 
              source={require('./assets/amaro2.png')}
              style={styles.productImage}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>SAIBA MAIS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Produto 4 */}
        <View style={styles.productCard}>
          <View style={styles.textContent}>
            <Text style={styles.productName}>Chocolate meio amargo</Text>
            <Text style={styles.productBrand}>Lacta Amaro - 40% cacau</Text>
          </View>
          <View style={styles.bottomContent}>
            <Image 
              source={require('./assets/demeter.png')}
              style={styles.productImage}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>SAIBA MAIS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01923F',
    paddingTop: 40,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  menuButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
     transform: [{ translateX: -25 }],
    marginBottom: 20,
    marginTop: 20,
  },
  logo: {
    width: 300,
    height: 190,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
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
