
import { resetPassword } from "@/mockApi/recovery";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,

  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

export default function RedefinirSenha() {
  const router = useRouter();
  const params = useLocalSearchParams<{ identifier?: string }>(); 
  const [identifier, setIdentifier] = useState<string | undefined>(undefined);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    if (params.identifier) {
      setIdentifier(params.identifier);
    } else {
     
      Alert.alert("Erro", "Informação do usuário não encontrada. Por favor, reinicie o processo.");
      router.replace("/loginScreen"); 
    }
  }, [params, router]);

  const handleReset = async () => {
    Keyboard.dismiss(); 
    if (!newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert("Atenção", "Por favor, preencha os campos de nova senha e confirmação.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Erro", "As senhas não conferem.");
      return;
    }
    if (newPassword.length < 6) { 
        Alert.alert("Senha curta", "A nova senha deve ter pelo menos 6 caracteres.");
        return;
    }
    if (!identifier) { 
        Alert.alert("Erro", "Não foi possível identificar o usuário.");
        return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword(identifier, newPassword);
      if (response.success) {
        Alert.alert("Sucesso", response.message + "\nVocê será redirecionado para a tela de login.");
        setNewPassword(""); 
        setConfirmPassword("");
        router.replace("/loginScreen"); 
      } else {
        Alert.alert("Falha", response.message);
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um problema ao tentar redefinir a senha.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require("./assets/logo.png")} 
          style={styles.externalLogo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Redefinição de senha</Text>
        <Text style={styles.mensagem}>
          Crie uma nova senha para <Text style={{fontWeight: 'bold'}}>{identifier || "sua conta"}</Text>.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nova senha</Text>
          <View style={styles.passwordInputView}>
            <TextInput
              style={styles.input}
              secureTextEntry={!isNewPasswordVisible}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Digite a nova senha"
              placeholderTextColor="#A9A9A9"
            />
            <TouchableOpacity onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)} style={styles.eyeIcon}>
              <Text style={styles.eyeText}>{isNewPasswordVisible ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirmar senha</Text>
          <View style={styles.passwordInputView}>
            <TextInput
              style={styles.input}
              secureTextEntry={!isConfirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirme a nova senha"
              placeholderTextColor="#A9A9A9"
            />
            <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={styles.eyeIcon}>
               <Text style={styles.eyeText}>{isConfirmPasswordVisible ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitContainer, isLoading && styles.submitContainerDisabled]}
          onPress={handleReset}
          disabled={isLoading}
        >
          {isLoading ? <ActivityIndicator color="#fff" size="small"/> : <Text style={styles.submitButton}>Redefinir Senha</Text>}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01923F",
    paddingHorizontal: 25, 
    alignItems: "center",
  },
  externalLogo: {
    width: "70%", 
    height: 120,  
    alignSelf: 'center',
    marginBottom: 25,
  },
  title: {
    color: "white",
    fontSize: 28, 
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  mensagem: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 22,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5, 
    marginLeft: 5, 
  },
  passwordInputView: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "rgba(255,255,255,0.15)", 
    borderRadius: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 5, 
  },
  input: {
    flex: 1, 
    height: 55, 
    color: "#fff",
    fontSize: 16, 
    paddingHorizontal: 15, 
  },
  eyeIcon: { 
    padding: 12,
  },
  eyeText: { 
    color: 'white',
    fontSize: 18,
  },
  submitContainer: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#FFAA39",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16, 
    borderRadius: 50,
  },
  submitContainerDisabled: { 
      backgroundColor: '#FFD18C',
  },
  submitButton: {
    color: "#fff",
    fontSize: 18, 
    fontWeight: "bold", 
    textAlign: "center",
  },
});