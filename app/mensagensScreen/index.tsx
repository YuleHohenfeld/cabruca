import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MensagemScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>

    
      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/mensagensEnviadasScreen')}>
          <Text style={styles.buttonText}>Enviar mensagem</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/mensagensRecebidasScreen')}>
          <Text style={styles.buttonText}>Mensagens recebidas</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01923F',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  backButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 250,
    height: 250,
    marginTop: -270,
  },
  buttonContainer: {
    width: '85%',
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    marginBottom: 30,
  },
  buttonEnviar: {
    
  },
  buttonRecebidas: {
   
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default MensagemScreen;