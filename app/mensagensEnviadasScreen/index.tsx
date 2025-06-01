import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function MensagemFormScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
   


      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Digite sua mensagem no campo de texto abaixo</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="De: NOME DO PRODUTOR"
          placeholderTextColor="#FFFFFF"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Para: ADMIN"
          placeholderTextColor="#FFFFFF"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Assunto:"
          placeholderTextColor="#FFFFFF"
        />
      </View>


      <View style={styles.textAreaContainer}>
        <Text style={styles.label}>Mensagem:</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#FFFFFF"
          multiline
        />
      </View>


      <TouchableOpacity style={styles.button} onPress={() => { /* lógica de envio */ }}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01923F',
    padding: 20,
    paddingTop: 30, 
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: '#FFA500',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    transform: [{ translateX: -25 }],
    marginBottom: 20, 
  },
  logo: {
    width: 250,  
    height: 150, 
    resizeMode: 'contain',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#075100',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
  },
  textAreaContainer: {
    marginBottom: 20,
  },
  textArea: {
    backgroundColor: '#075100',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});