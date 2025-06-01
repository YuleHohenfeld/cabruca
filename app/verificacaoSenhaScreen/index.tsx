import { verifyPasswordRecoveryCode } from '@/mockApi/recovery';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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

export default function CodigoRecuperacao() {
  const router = useRouter();
  const params = useLocalSearchParams<{ identifier?: string }>();
  const [identifier, setIdentifier] = useState<string | undefined>(undefined);

  const [codes, setCodes] = useState(["", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorIndexes, setErrorIndexes] = useState<number[]>([]);

  const inputsRef = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (params.identifier) {
      setIdentifier(params.identifier);
    } else {
      Keyboard.dismiss();
      Alert.alert("Erro", "Identificador não fornecido. Por favor, tente o processo de recuperação novamente.");
    }
  }, [params]);

  const handleChange = (text: string, index: number) => {
    if (errorIndexes.length > 0) setErrorIndexes([]);

    if (/^\d*$/.test(text) && text.length <= 1) {
      const newCodes = [...codes];
      newCodes[index] = text;
      setCodes(newCodes);

      if (text && index < codes.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !codes[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    const recoveryCodeString = codes.join("");

    if (recoveryCodeString.length !== codes.length) {
      Alert.alert("Atenção", "Por favor, preencha todos os 5 dígitos do código.");
      const emptyIndexes = codes.map((c, i) => c === "" ? i : -1).filter(i => i !== -1);
      setErrorIndexes(emptyIndexes);
      return;
    }

    if (!identifier) {
      Alert.alert("Erro", "Identificador (Email/CNPJ) não encontrado. Por favor, inicie o processo novamente.");
      return;
    }

    setIsLoading(true);
    setErrorIndexes([]);

    try {
      const response = await verifyPasswordRecoveryCode(identifier, recoveryCodeString);

      if (response.success) {
        Alert.alert('Sucesso!', response.message);
        router.push({
          pathname: "/redefirSenhaScreen", 
          params: { identifier }
        });
      } else {
        Alert.alert('Código Inválido', response.message);
        setErrorIndexes([0, 1, 2, 3, 4]);
      }
    } catch (error) {
      console.error("Erro ao verificar código:", error);
      Alert.alert('Erro', 'Ocorreu um problema ao verificar o código. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Image
          source={require("./assets/logo.png")}
          style={styles.externalLogo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Digite o código</Text>

        <Text style={styles.mensagem}>
          Enviamos um código para o Email/CNPJ{"\n"}
          <Text style={{ fontWeight: 'bold' }}>{identifier || "..."}</Text>.
          {"\n"}Insira-o abaixo para continuar.
        </Text>

        <View style={styles.inputContainer}>
          {codes.map((value, index) => (
            <TextInput
              key={index}
              ref={(el) => { inputsRef.current[index] = el; }}
              style={[styles.input, errorIndexes.includes(index) && styles.inputError]}
              maxLength={1}
              keyboardType="number-pad"
              value={value}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              returnKeyType={index === codes.length - 1 ? "done" : "next"}
              onSubmitEditing={() => {
                if (index === codes.length - 1) {
                  handleSubmit();
                } else if (codes[index]) {
                  inputsRef.current[index + 1]?.focus();
                }
              }}
              editable={!isLoading}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.submitContainer, isLoading && styles.submitContainerDisabled]}
          activeOpacity={0.8}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButton}>Verificar Código</Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01923F",
    paddingTop: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    position: "relative",
  },
  externalLogo: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  mensagem: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 39,
  },
  inputContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  input: {
    width: 50,
    height: 70,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    color: "#fff",
    textAlign: "center",
    fontSize: 32,
    marginHorizontal: 8,
  },
  inputError: {
    borderColor: "red",
  },
  submitContainer: {
    marginTop: 20,
    width: 300,
    backgroundColor: "#FFAA39",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 30,
  },
  submitContainerDisabled: {
    backgroundColor: "#FFAA39AA", 
  },
  submitButton: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
});
