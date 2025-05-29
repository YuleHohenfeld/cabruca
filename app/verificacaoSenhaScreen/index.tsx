import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CodigoRecuperacao() {
  const router = useRouter();
  const [codes, setCodes] = useState(["", "", "", "", ""]);

  const inputsRef = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newCodes = [...codes];
      newCodes[index] = text;
      setCodes(newCodes);

      if (text && index < codes.length - 1) {
    
        inputsRef.current[index + 1]?.focus();
      }

      if (!text && index > 0) {
      
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    const allFilled = codes.every((digit) => digit.trim().length === 1);
    if (allFilled) {
      Keyboard.dismiss(); 
      router.push("/redefirSenhaScreen");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <View style={styles.container}>
      

      <Image
        source={require("./assets/logo.png")}
        style={styles.externalLogo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Digite o código</Text>

      <Text style={styles.mensagem}>
        Enviamos um código para seu e-mail. Insira-o abaixo para continuar com a
        recuperação de senha.
      </Text>

      <View style={styles.inputContainer}>
        {codes.map((value, index) => (
          <TextInput
            key={index}
           ref={(el) => {
  inputsRef.current[index] = el;
}}
            style={styles.input}
            maxLength={1}
            keyboardType="number-pad"
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            returnKeyType={index === codes.length - 1 ? "done" : "next"}
            onSubmitEditing={() => {
              if (index < codes.length - 1) {
                inputsRef.current[index + 1]?.focus();
              } else {
                handleSubmit();
              }
            }}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.submitContainer}
        activeOpacity={0.8}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButton}>Enviar</Text>
      </TouchableOpacity>
    </View>
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
    transform: [{ translateX: -20 }],
    marginBottom: 2,
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    transform: [{ translateX: -28 }],
    borderRadius: 10,
    padding: 8,
  },
  input: {
    width: 65,
    height: 90,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    color: "#fff",
    textAlign: "center",
    fontSize: 32,
    marginHorizontal: 8,
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
  submitButton: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
});
