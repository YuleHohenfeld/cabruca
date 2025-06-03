// app/DetalheEventoSalvoScreen.tsx

import { EventReport, EventReportProduct, getMockEventReportById } from '@/mockApi/events'; // Verifique o alias @/
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Alert, Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Ajuste o caminho para o seu logo, se for usá-lo nesta tela também
const logoAsset = require('./assets/logo.png');

// Componente para exibir cada produto dentro do relatório salvo
const ReportProductItemView = ({ product }: { product: EventReportProduct }) => (
  <View style={styles.productItem}>
    <Text style={styles.productNameText}>Produto: {product.name || "Não especificado"}</Text>
    <Text style={styles.productDetailText}>Quantidade: {product.quantity || "N/A"}</Text>
    <Text style={styles.productDetailText}>Câmbio: {product.exchange || "N/A"}</Text>
  </View>
);

export default function DetalheEventoSalvoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ reportId?: string }>();
  const { reportId } = params;

  const [report, setReport] = useState<EventReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (reportId) {
      console.log(`[DetalheEventoSalvoScreen] Buscando relatório com ID: ${reportId}`);
      const fetchReport = async () => {
        setIsLoading(true);
        try {
          const response = await getMockEventReportById(reportId);
          if (response.success && response.report) {
            setReport(response.report);
          } else {
            Alert.alert("Erro", response.message || "Relatório não encontrado.");
          }
        } catch (error) {
          console.error("[DetalheEventoSalvoScreen] Erro ao buscar relatório:", error);
          Alert.alert("Erro", "Não foi possível carregar os detalhes do relatório.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchReport();
    } else {
      Alert.alert("Erro de Navegação", "ID do relatório não fornecido.");
      setIsLoading(false);
    }
  }, [reportId]);

  if (isLoading) {
    return (
      <View style={[styles.mainContainer, styles.centeredContainer]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Carregando Detalhes do Relatório...</Text>
      </View>
    );
  }

  if (!report) {
    return (
      <View style={[styles.mainContainer, styles.centeredContainer]}>
        <Text style={styles.errorText}>Relatório não encontrado.</Text>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.replace('/relatorioEventosScreen')}>
          <Text style={styles.actionButtonText}>Voltar para Lista</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Se o relatório foi carregado
  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          title: report.eventName.substring(0,25) + (report.eventName.length > 25 ? "..." : ""), // Título dinâmico
          headerStyle: { backgroundColor: '#01923F' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitle: 'Relatórios', // Texto do botão "Voltar" no iOS
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.headerImageContainer}>
          <Image source={logoAsset} style={styles.logoImage} resizeMode="contain" />
        </View>

        <View style={styles.cardDetail}>
          <Text style={styles.reportMainTitle}>{report.eventName}</Text>
          <Text style={styles.reportSubTitle}>{report.eventCityCountry || 'Local não informado'}</Text>

          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>ID do Relatório:</Text>
            <Text style={styles.detailValue}>{report.reportId || report.id}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>Data de Registro:</Text>
            <Text style={styles.detailValue}>{report.registrationDate}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>Data do Evento:</Text>
            <Text style={styles.detailValue}>{report.eventDate || 'Não informada'}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>Responsável (Mock):</Text>
            <Text style={styles.detailValue}>{report.responsible}</Text>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>Tipo de Evento:</Text>
            <Text style={styles.detailValue}>{report.eventType || 'Não informado'}</Text>
          </View>
          {report.producerName && (
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Produtor Associado:</Text>
              <Text style={styles.detailValue}>{report.producerName}</Text>
            </View>
          )}

          <Text style={styles.productsSectionTitle}>Produtos Apresentados/Negociados:</Text>
          {report.products && report.products.length > 0 ? (
            report.products.map((product, index) => (
              <ReportProductItemView key={index} product={product} />
            ))
          ) : (
            <Text style={styles.detailValue}>Nenhum produto listado.</Text>
          )}

          {report.cdp && (
            <View style={styles.detailSectionFull}>
              <Text style={styles.detailLabel}>CDP:</Text>
              <Text style={styles.detailValue}>{report.cdp}</Text>
            </View>
          )}
          {report.totalValue && (
             <View style={styles.detailSectionFull}>
              <Text style={styles.detailLabel}>Valor Total Estimado:</Text>
              <Text style={styles.detailValue}>{report.totalValue}</Text>
            </View>
          )}

          <Text style={styles.sectionTitle}>Descrição/Observações:</Text>
          <Text style={styles.descriptionValue}>{report.description || 'Nenhuma descrição.'}</Text>
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={() => router.replace('/relatorioEventosScreen')}>
          <Text style={styles.actionButtonText}>Voltar para Lista de Relatórios</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Estilos para a tela de detalhes
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#01923F',
  },
  scrollContentContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#FFCDD2',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 20,
  },
  headerImageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logoImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  cardDetail: {
    backgroundColor: 'rgba(255,255,255, 0.05)', // Fundo do card sutil
    borderRadius: 10,
    padding: 18,
    marginBottom: 20,
  },
  reportMainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  reportSubTitle: {
    fontSize: 15,
    color: '#E0E0E0',
    textAlign: 'center',
    marginBottom: 18,
    fontStyle: 'italic',
  },
  detailSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  detailSectionFull: { // Para CDP, Valor Total
    marginBottom: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  detailLabel: {
    fontSize: 15,
    color: '#B2DFDB', // Cor mais clara para o label
    fontWeight: '600',
    marginRight: 8,
  },
  detailValue: {
    fontSize: 15,
    color: '#FFFFFF',
    flexShrink: 1, // Permite que o texto quebre a linha se for muito longo
    textAlign: 'right',
  },
  productsSectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFAA39',
    marginTop: 15,
    marginBottom: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  productItem: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  productNameText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  productDetailText: {
    fontSize: 14,
    color: '#E0E0E0',
    marginLeft: 5,
  },
  sectionTitle: { // Para o título "Descrição/Observações"
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFAA39',
    marginTop: 15,
    marginBottom: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  descriptionValue: {
    fontSize: 15,
    color: '#F0F0F0',
    lineHeight: 21,
    fontStyle: 'italic',
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
  },
  actionButton: {
    backgroundColor: '#FFAA39',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});