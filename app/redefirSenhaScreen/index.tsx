import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RedefinirSenha() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      

      <Image
        source={require("./assets/logo.png")}
        style={styles.externalLogo}
        resizeMode="contain"
      />

    
      <Text style={styles.title}>Redefinição de senha</Text>

  
      <Text style={styles.mensagem}>Digite sua nova senha</Text>

  
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nova senha</Text>
        <TextInput style={styles.input} secureTextEntry />

        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput style={styles.input} secureTextEntry />
      </View>

    
      <TouchableOpacity
        style={styles.submitContainer}
        onPress={() => {
  
          console.log("Senha redefinida");
        }}
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
    padding: 15,
    alignItems: "center",
     justifyContent: "flex-start",
    paddingTop: 1, 
    position: "relative",
  },
  
  externalLogo: {
    width: "100%",
    height: 200,
      transform: [{ translateX: -25 }],
    marginBottom: 10, 
  marginTop: 3
  },
  title: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  mensagem: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    justifyContent: "space-around",
    borderRadius: 10,
    gap: 10,
    padding: 15,
  },
  label: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    paddingHorizontal: 20,
    height: 70,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    color: "#fff",
    fontSize: 20,
  },
  submitContainer: {
    marginTop: 30,
    width: "100%",
    backgroundColor: "#FFAA39",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 50,
  },
  submitButton: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
});

