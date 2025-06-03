// app/MissionReportScreen.tsx (ou o caminho/nome que você está usando)

import { Stack, useFocusEffect, useRouter } from 'expo-router';
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
// Importe a função para buscar relatórios e a interface EventReport
import { EventReport, getMockEventReports } from '@/mockApi/events'; // Verifique o alias @/

// Ajuste o caminho para o seu logo se necessário
const logoAsset = require('./assets/logo.png'); // Se assets está na raiz e esta tela em app/

// Componente para cada card de evento/relatório na lista
const ReportCardItem = ({ report, onPress }: { report: EventReport; onPress: () => void }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{report.eventName}</Text>
    <Text style={styles.cardSubText}>{report.eventCityCountry || 'Local não definido'}</Text>
    <Text style={styles.cardDateText}>
      {report.eventDate ? `Data do Evento: ${report.eventDate}` : `Registrado em: ${new Date(report.createdAt).toLocaleDateString('pt-BR')}`}
    </Text>
    {report.description && <Text style={styles.cardDescriptionPreview} numberOfLines={2}>{report.description}</Text>}
  </TouchableOpacity>
);

// Componente principal da tela de listagem
export default function MissionReportScreen() {
  const router = useRouter();
  const [reports, setReports] = useState<EventReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadEventReports = useCallback(async () => {
    if (!refreshing) setIsLoading(true);
    console.log("[MissionReportScreen] Carregando relatórios...");
    try {
      const response = await getMockEventReports();
      if (response.success) {
        setReports(response.reports);
      } else {
        Alert.alert("Erro ao Carregar", response.message || "Não foi possível carregar os relatórios.");
      }
    } catch (error) {
      console.error("[MissionReportScreen] Erro ao buscar relatórios:", error);
      Alert.alert("Erro Inesperado", "Ocorreu um problema ao buscar os relatórios.");
    } finally {
      setIsLoading(false);
      if (refreshing) setRefreshing(false);
    }
  }, [refreshing]);

  useFocusEffect(
    useCallback(() => {
      console.log("[MissionReportScreen] Tela ganhou foco, carregando relatórios...");
      loadEventReports();
    }, [loadEventReports])
  );

  const onRefresh = useCallback(() => {
    console.log("[MissionReportScreen] Iniciando refresh...");
    setRefreshing(true);
    loadEventReports();
  }, [loadEventReports]);

  const handleAddReport = () => {
    // Navega para a tela de formulário
    // Certifique-se que '/FormularioEventoScreen' é o nome da rota para sua tela de formulário
    router.push('/nomeEventoScreen');
  };

  const handleViewReportDetails = (reportId: string) => {
    // Navega para a tela de detalhes do evento salvo
    // Certifique-se que '/DetalheEventoSalvoScreen' é o nome da rota
    router.push({
      pathname: '/relatorioEventos2Screen',
      params: { reportId: reportId },
    });
  };

  if (isLoading && !refreshing && reports.length === 0) {
    return (
      <View style={[styles.mainContainer, styles.centeredLoadingOrEmpty]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.messageText}>Carregando Relatórios...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          title: 'Relatório de Missões',
          headerStyle: { backgroundColor: '#01923F' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFFFFF"
            colors={['#FFFFFF']}
          />
        }
      >
        <View style={styles.header}>
          <Image
            source={logoAsset}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.mainTitle}>Relatório de Missões</Text>

        {reports.length === 0 && !isLoading ? (
          <View style={styles.centeredMessage}>
             <Text style={styles.emptyMessageText}>Nenhum relatório adicionado.</Text>
             <Text style={styles.emptyMessageSubText}>Clique em "Adicionar" para criar.</Text>
          </View>
        ) : (
          reports.map((report) => (
            <ReportCardItem
              key={report.id}
              report={report}
              onPress={() => handleViewReportDetails(report.id)}
            />
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddReport}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Seus estilos originais, com as adaptações que fizemos para loading e empty states
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#01923F',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20, // Adicionado paddingHorizontal
    paddingTop: 10,        // Ajustado (era 20 ou 0)
    paddingBottom: 80,     // Aumentado para o botão não cobrir o último card
  },
  centeredLoadingOrEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageText: {
    color: '#FFFFFF',
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  centeredMessage: {
    flex: 1, // Para ocupar espaço se o scrollview estiver vazio
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50, // Para centralizar melhor a mensagem
  },
  emptyMessageText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyMessageSubText: {
      color: '#E0E0E0',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 15, // Ajustado
  },
  logo: {
    width: 280,
    transform: [{ translateX: -12 }], // Mantido do seu original
    height: 130,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20, // Ajustado
    textAlign: 'center',
  },
  card: { // Estilo para ReportCardItem
    backgroundColor: '#59A752', // Mantido do seu original
    borderRadius: 10,
    padding: 18, // Aumentado um pouco
    marginBottom: 15,
    // Removido justifyContent e alignItems para o texto alinhar à esquerda por padrão
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5, // Adicionado
  },
  cardSubText: { // Novo estilo para cidade/país no card
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 3,
  },
  cardDateText: { // Novo estilo para data no card
    fontSize: 12,
    color: '#C0C0C0',
    fontStyle: 'italic',
    marginTop: 4,
  },
  cardDescriptionPreview: { // Novo estilo para preview da descrição
    fontSize: 13,
    color: '#D0D0D0',
    marginTop: 5,
    fontStyle: 'italic',
  },
  addButton: { // Mantido do seu original
    position: 'absolute',
    bottom: 40,
    right: 30,
    width: 120,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFAA39',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 4,
  },
  addButtonText: { // Mantido do seu original
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Estilos 'backButton' e 'backButtonText' foram removidos pois não são usados no JSX.
});

