import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';

const PasswordRecoveryScreen = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  const handleRecovery = () => {
    if (!inputValue.trim()) {
      Alert.alert('Campo obrigatório', 'Por favor, preencha o campo com seu e-mail ou CNPJ.');
      return;
    }

    router.push('/verificacaoSenhaScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Recuperação de senha</Text>

      <Text style={styles.explanationText}>
        Informe seu CNPJ ou e-mail cadastrado para iniciar o processo de recuperação de senha.
      </Text>

      <Text style={styles.inputLabel}>Email/CNPJ</Text>

      <TextInput
        style={styles.input}
        keyboardType="email-address"
        placeholderTextColor="#FFFFFF"
        value={inputValue}
        onChangeText={setInputValue}
      />

      <Button 
        mode="contained" 
        style={styles.button} 
        labelStyle={styles.buttonText}
        onPress={handleRecovery}
      >
        Enviar
      </Button>
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
  logoContainer: {
    transform: [{ translateX: -25 }],
    marginBottom: 30,
    marginTop: -290,
  },
  logo: {
    width: 290,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  explanationText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  inputLabel: {
    width: '100%',
    color: '#FFFFFF',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 15,
    color: '#FFFFFF',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFAA39',
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default PasswordRecoveryScreen;