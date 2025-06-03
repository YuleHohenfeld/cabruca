import { getMockOrders, Order, OrderProductItem } from '@/mockApi/products'; // Ajuste o caminho se mockApi/orders.ts
import { Stack, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  ScrollView, StyleSheet, Text, View
} from 'react-native';


const logo = require('./assets/logo.png');

const PedidoProdutoItem = ({ item }: { item: OrderProductItem  }) => (
  <View style={styles.produtoRow}>
    <View style={styles.imagePlaceholder} />
    <Text style={styles.produtoNome}>{item.name}</Text>
    <Text style={styles.qtd}>QTD: {String(item.quantity).padStart(2, '0')}</Text>
  </View>
);

const PedidoCard = ({ pedido }: { pedido: Order }) => {
  return (
    <View style={styles.pedidoCard}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.dataPedido}>{pedido.data}</Text>
          <Text style={styles.idPedido}>ID: {pedido.id}</Text>
        </View>
        <Text style={[styles.statusPedido, { color: pedido.corStatus, backgroundColor: pedido.corStatus === '#FF2D2D' ? 'rgba(255,0,0,0.1)' : 'rgba(0,200,0,0.1)'}]}>
          {pedido.status}
        </Text>
      </View>
      {pedido.produtos.map((produto, idx) => (
        <PedidoProdutoItem key={`${pedido.id}-prod-${produto.productId}-${idx}`} item={produto} />
      ))}
      <View style={styles.footerRow}>
        <Text style={styles.produtor}>Solicitante: {pedido.produtor}</Text>
        {pedido.totalOrderValue && (
          <Text style={styles.totalValueText}>
            Total: {pedido.exchangeRate || ''} {pedido.totalOrderValue}
          </Text>
        )}
      </View>
    </View>
  );
};

export default function PedidosScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const filterByUserIdentifier = undefined; 
  const loadOrders = useCallback(async () => {
    if (!refreshing) setIsLoading(true);
    console.log(`[PedidosScreen] Carregando pedidos...`);
    try {
      const response = await getMockOrders(filterByUserIdentifier);
      if (response.success) {
        setOrders(response.orders);
      } else {
        Alert.alert("Erro ao Carregar", response.message || "Não foi possível carregar os pedidos.");
      }
    } catch (error: any) {
      console.error("[PedidosScreen] Catch em loadOrders:", error);
      Alert.alert("Erro Inesperado", error.message || "Ocorreu um problema ao buscar os pedidos.");
    } finally {
      setIsLoading(false);
      if (refreshing) setRefreshing(false);
    }
  }, [refreshing, filterByUserIdentifier]);

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [loadOrders])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadOrders();
  }, [loadOrders]);

  if (isLoading && !refreshing && orders.length === 0) {
    return (
      <View style={[styles.container, styles.centeredLoading]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>Carregando Pedidos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Histórico de Pedidos', headerStyle: {backgroundColor: '#01923F'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'} }} />
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
      <Text style={styles.sectionTitle}>Meus Pedidos</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />
        }
      >
        {orders.length === 0 && !isLoading ? (
          <View style={styles.centeredMessage}>
            <Text style={styles.emptyText}>Nenhum pedido encontrado.</Text>
            <Text style={styles.emptySubText}>Faça um novo pedido ou arraste para baixo para atualizar.</Text>
          </View>
        ) : (
          orders.map((pedido) => (
            <PedidoCard key={pedido.id} pedido={pedido} />
          ))
        )}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#01923F', paddingTop: 10, },
  centeredLoading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#01923F', },
  loadingText: { color: '#FFFFFF', marginTop: 10, fontSize: 16, },
  centeredMessage: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20, },
  emptyText: { color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 'bold', },
  emptySubText: { color: '#E0E0E0', textAlign: 'center', fontSize: 14, marginTop: 8, },
  logoContainer: { alignItems: 'center', marginTop: 10, marginBottom: 5, }, // Reduzido marginBottom
  logo: { width: 250, height: 120, transform: [{ translateX: -12 }], },
  sectionTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFFFFF', marginVertical: 10, textAlign: 'center', }, // Reduzido marginVertical
  scrollContainer: { paddingHorizontal: 15, paddingBottom: 20, flexGrow: 1, },
  pedidoCard: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 15, marginBottom: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.20, shadowRadius: 1.41, elevation: 2, },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, },
  dataPedido: { color: 'white', fontWeight: 'bold', fontSize: 15, },
  idPedido: { color: '#E0E0E0', fontSize: 11, marginTop: 2, },
  statusPedido: { fontWeight: 'bold', fontSize: 13, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, overflow: 'hidden', textAlign: 'center', },
  produtoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 8, padding: 10, },
  imagePlaceholder: { width: 35, height: 35, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 5, marginRight: 10, },
  produtoNome: { flex: 1, color: '#F0F0F0', fontWeight: '500', fontSize: 14, },
  qtd: { color: '#F0F0F0', fontWeight: 'bold', fontSize: 14, marginLeft: 10, },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.15)', },
  produtor: { color: '#E0E0E0', fontStyle: 'italic', fontSize: 13, },
  totalValueText: { color: 'white', fontWeight: 'bold', fontSize: 14, }
});