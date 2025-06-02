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
    justifyContent: 'flex-start',
    alignItems: 'center',   
    paddingHorizontal: 20,   
    paddingTop: 60,          
    
  },
 
  logoContainer: {
    
    marginBottom: 40, 
    alignItems: 'center', 
  },
  logo: {
   width: 280,
        transform: [{ translateX: -12 }],
    height: 130, 
  },
  buttonContainer: {
    width: '90%', 

  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18, 
    width: '100%', 
    marginBottom: 20, 
  },
 
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default MensagemScreen;