



import { getMockReceivedMessages, Message } from '@/mockApi/messages';
import { Ionicons } from '@expo/vector-icons'; 
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const logo = require('./assets/logo.png'); 

const Cabecalho = () => {
  return (
    <View style={styles.logoContainer}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

const MensagemItem = ({ nome, data, id, subject, body }: { nome: string; data: string; id: string; subject: string; body: string }) => {
  const router = useRouter();
  const handleMessagePress = () => {
    console.log("Abrindo mensagem:", { id, subject, from: nome, body });
    Alert.alert("Abrir Mensagem", `De: ${nome}\nAssunto: ${subject}\n\n${body}`);
  };

  return (
    <View>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.mensagemContainer} onPress={handleMessagePress}>
        <View style={styles.mensagemContent}>
          <View style={styles.mensagemInfo}>
            <Text style={styles.mensagemAssunto}>{subject}</Text>
            <Text style={styles.mensagemTexto}>De: {nome}</Text>
            <Text style={styles.mensagemData}>{data}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
};


export default function MensagensScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const currentUserIdentifier = "ADMIN"; 

  const loadMessages = useCallback(async () => {
    if (!refreshing) setIsLoading(true);
    console.log(`[MensagensScreen] Carregando mensagens para: ${currentUserIdentifier}`);
    try {
      const response = await getMockReceivedMessages(currentUserIdentifier);
      console.log('[MensagensScreen] Resposta de getMockReceivedMessages:', JSON.stringify(response, null, 2));
      if (response.success) {
        setMessages(response.messages);
      } else {
        Alert.alert('Erro ao Carregar', response.message || "Não foi possível carregar as mensagens.");
      }
    } catch (error: any) {
      console.error('[MensagensScreen] Catch em loadMessages:', error);
      Alert.alert('Erro Inesperado', error.message || "Ocorreu um problema ao buscar as mensagens.");
    } finally {
      setIsLoading(false);
      if (refreshing) setRefreshing(false);
    }
  }, [currentUserIdentifier, refreshing]);

  useFocusEffect(
    useCallback(() => {
      loadMessages();
    }, [loadMessages])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadMessages();
  }, [loadMessages]);

  if (isLoading && !refreshing && messages.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Carregando mensagens...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={messages.length === 0 ? styles.contentContainerCentered : {}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" colors={['#FFFFFF']} />
      }
    >
      <Cabecalho />
      <Text style={styles.title}>Mensagens Recebidas (Admin)</Text>

      {messages.length === 0 && !isLoading ? (
        <View style={styles.centeredContent}>
          <Text style={styles.emptyMessageText}>Nenhuma mensagem recebida.</Text>
          <Text style={styles.emptyMessageSubText}>Arraste para baixo para atualizar.</Text>
        </View>
      ) : (
        messages.map((msg) => (
          <MensagemItem
            key={msg.id}
            id={msg.id}
            nome={msg.from} 
            subject={msg.subject}
            body={msg.body}
            data={new Date(msg.createdAt).toLocaleString('pt-BR', {
              day: '2-digit', month: 'long', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })}
          />
        ))
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01923F',
    paddingHorizontal: 10,
  },
  contentContainerCentered: { 
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: { 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flex: 1, 
  },
  centeredContent: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50, 
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 16,
  },
  emptyMessageText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18, 
    fontWeight: 'bold',
  },
  emptyMessageSubText: {
    color: '#E0E0E0',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30, 
    marginBottom: 15,
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 15, 
    marginVertical: 8, 
  },
  mensagemContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 12, 
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 8, 
  },
  mensagemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mensagemInfo: {
    flex: 1,
    marginRight: 10,
  },
  mensagemAssunto: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 3, 
  },
  mensagemTexto: { 
    fontSize: 15,
    color: '#E0E0E0', 
    marginBottom: 4,
  },
  mensagemData: {
    fontSize: 13, 
    color: '#B0B0B0', 
  },
});