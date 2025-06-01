
import { sendMockMessage } from '@/mockApi/messages';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,


  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

export default function MensagemFormScreen() {
  const router = useRouter();

  const [fromUser] = useState("(Nome do Admin)");
  const [toUser] = useState("(Nome do Produtor)");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    Keyboard.dismiss(); 
    if (!subject.trim() || !body.trim()) {
      Alert.alert("Campos Vazios", "Por favor, preencha o assunto e a mensagem.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await sendMockMessage(fromUser, toUser, subject, body);
      if (response.success) {
        Alert.alert("Sucesso", response.message);
        setSubject("");
        setBody("");
      } else {
        Alert.alert("Erro", response.message || "Não foi possível enviar a mensagem.");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um problema ao enviar a mensagem.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require('./assets/logo.png')}
              style={styles.logo}
            />
          </View>

          <Text style={styles.title}>Digite sua mensagem no campo de texto abaixo</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.labelFixed}>De:</Text>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={fromUser}
              placeholderTextColor="#A9A9A9" 
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.labelFixed}>Para:</Text>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={toUser}
              placeholderTextColor="#A9A9A9" 
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input} 
              placeholder="Assunto:"
              placeholderTextColor="#A9A9A9"
              value={subject}
              onChangeText={setSubject}
            />
          </View>

          <View style={styles.textAreaContainer}>
            <Text style={styles.label}>Mensagem:</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Digite sua mensagem..."
              placeholderTextColor="#A9A9A9" 
              multiline
              value={body}
              onChangeText={setBody}
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSendMessage}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.buttonText}>Enviar</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: { 
    flex: 1,
    backgroundColor: '#01923F',
  },
  container: {
    flex: 1, 
    backgroundColor: '#01923F',
    padding: 20,
    paddingTop: 50,
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
    marginBottom: 12,
  },
  logo: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15, 
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: '#FFFFFF', 
    fontSize: 16,
    marginBottom: 8,
  },
  labelFixed: {
    color: '#FFFFFF', 
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFFFFF', 
    color: '#000000',           
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,            
    borderColor: '#000000',    
  },
  inputDisabled: { 
    backgroundColor: '#F0F0F0',
    color: '#555555',          
  
  
  },
  textAreaContainer: {
    marginBottom: 20,
  },
  textArea: {
    backgroundColor: '#FFFFFF', 
    color: '#000000',           
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 1,             
    borderColor: '#000000',     
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: '#CC8400',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});