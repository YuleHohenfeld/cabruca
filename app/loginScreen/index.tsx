import { login } from '@/mockApi/auth';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

const TextInputExample = () => {
  const [emailOrCnpj, setEmailOrCnpj] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrarMe, setLembrarMe] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!emailOrCnpj.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o email/CNPJ e a senha.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await login(emailOrCnpj, senha);

      if (response.success && response.user) {
        Alert.alert('Sucesso!', `Bem-vindo, ${response.user.name}!`);
        router.replace('/menuScreen');
      } else {
        Alert.alert('Falha no Login', response.message || 'Email ou senha inválidos.');
      }
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
        </View>

        <Text style={styles.title}>Seja bem-vindo</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setEmailOrCnpj}
            value={emailOrCnpj}
            placeholder="Email/CNPJ"
            placeholderTextColor="#fff"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputSenha}
            onChangeText={setSenha}
            value={senha}
            placeholder="Senha"
            placeholderTextColor="#fff"
            secureTextEntry={!senhaVisivel}
          />
          <TouchableOpacity
            onPress={() => setSenhaVisivel(!senhaVisivel)}
            style={styles.eyeIcon}>
            <Icon
              name={senhaVisivel ? 'eye' : 'eye-off'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={lembrarMe}
            onValueChange={setLembrarMe}
            style={{
              backgroundColor: lembrarMe ? '#007bff' : '#fff',
              borderColor: '#fff',
              borderWidth: 1,
              width: 22,
              height: 22,
              borderRadius: 4,
              marginRight: 8,
            }}
            color={lembrarMe ? '#007bff' : undefined}
          />
          <Text style={styles.checkboxLabel}>Lembrar-me</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            isLoading ? { opacity: 0.6 } : null
          ]}
          onPress={handleLogin}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.forgotPassword}>
          Esqueceu sua senha?
          <Text
            style={styles.clickHere}
            onPress={() => { if (!isLoading) router.push('/recuperacaoSenhaScreen'); }}
          >
            {' '}Clique aqui
          </Text>
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#01923F',
  },

  imageContainer: {
    position: 'absolute',
    top: 30,
    transform: [{ translateX: -20 }],
    zIndex: 1,
    alignItems: 'center',
    width: '100%',
  },

  logo: {
    width: 280,
    height: 180,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 22,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },

  inputContainer: {
    width: '80%',
    marginBottom: 12,
    position: 'relative',
  },

  input: {
    borderColor: '#fff',
    color: '#fff',
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderRadius: 30,
    padding: 12,
    marginBottom: 12,
  },

  inputSenha: {
    borderColor: '#fff',
    color: '#fff',
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderRadius: 30,
    padding: 12,
    paddingRight: 50,
  },

  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 18,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '70%',
    justifyContent: 'flex-start',
  },

  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#fff',
  },

  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
    marginTop: 30,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  forgotPassword: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 18,
    fontSize: 14,
    marginTop: 16,
  },

  clickHere: {
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default TextInputExample;
