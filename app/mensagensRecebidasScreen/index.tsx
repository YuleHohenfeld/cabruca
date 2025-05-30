import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const logo = require('./assets/logo.png');

interface Mensagem {
  nome: string;
  data: string;
}

const mensagens: Mensagem[] = [
  { nome: 'NOME PRODUTOR', data: '15 de maio, 2025 às 15:35' },
  { nome: 'NOME PRODUTOR', data: '10 de maio, 2025 às 13:30' },
  { nome: 'NOME ADMINISTRADOR', data: '05 de abril, 2025 às 13:50' },
  { nome: 'NOME PRODUTOR', data: '20 de março, 2025 às 16:00' },
  { nome: 'NOME ADMINISTRADOR', data: '02 de janeiro, 2025 às 10:25' },
  { nome: 'NOME ADMINISTRADOR', data: '13 dezembro, 2024 às 17:40' },
];

const Cabecalho = () => {
  const router = useRouter();

  return (
    <>
   

      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
    </>
  );
};


const MensagemItem = ({ nome, data }: Mensagem) => (
  <View>
    <View style={styles.divider} />
    <TouchableOpacity style={styles.mensagemContainer}>
      <View style={styles.mensagemContent}>
        <View>
          <Text style={styles.mensagemTexto}>{nome}</Text>
          <Text style={styles.mensagemData}>{data}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  </View>
);


export default function MensagensScreen() {
  return (
    <ScrollView style={styles.container}>
      <Cabecalho />
      <Text style={styles.title}>Mensagens recebidas</Text>

      {mensagens.map((mensagem, index) => (
        <MensagemItem key={index} nome={mensagem.nome} data={mensagem.data} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01923F',
    padding: 10,
  },
  backButton: {
  width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backArrow: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
      transform: [{ translateX: -25 }],
    marginTop: 10,
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  mensagemContainer: {
    backgroundColor: '#01923F',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  mensagemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mensagemTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mensagemData: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});
