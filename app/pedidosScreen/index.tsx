import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const pedidos = [
  {
    data: '6 de julho, 2025',
    status: 'Pedido pendente',
    corStatus: '#FF2D2D',
    produtos: [
      { nome: 'Chocolate dark 40%', qtd: 10 },
      { nome: 'Chocolate ao leite', qtd: 10 },
      { nome: 'Chocolate ao amargo', qtd: 8 },
    ],
    produtor: '(nomeprodutor)',
  },
  {
    data: '10 de maio, 2025',
    status: 'Pedido finalizado',
    corStatus: '#00FF88',
    produtos: [
      { nome: 'Chocolate dark 40%', qtd: 11 },
      { nome: 'Chocolate ao leite', qtd: 12 },
      { nome: 'Chocolate ao amargo', qtd: 5 },
    ],
    produtor: '(nomeprodutor)',
  },
];

const PedidosScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
    
      <View style={styles.logoContainer}>
        <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <Text style={styles.sectionTitle}>Pedidos</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {pedidos.map((pedido, index) => (
          <View key={index} style={styles.pedidoCard}>
            <View style={styles.headerRow}>
              <Text style={styles.dataPedido}>{pedido.data}</Text>
              <Text style={[styles.statusPedido, { color: pedido.corStatus }]}>
                {pedido.status}
              </Text>
            </View>

            {pedido.produtos.map((produto, idx) => (
              <View key={idx} style={styles.produtoRow}>
                <View style={styles.imagePlaceholder} />
                <Text style={styles.produtoNome}>{produto.nome}</Text>
                <Text style={styles.qtd}>QTD: {produto.qtd.toString().padStart(2, '0')}</Text>
              </View>
            ))}

            <Text style={styles.produtor}>{pedido.produtor}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01923F',
    paddingTop: 60,
  },
  menuButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  menuButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
     transform: [{ translateX: -25 }],
    marginTop: 20,
  },
  logo: {
    width: 300,
    height: 190,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 10,
    marginLeft: 20, 
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  pedidoCard: {
    backgroundColor: '#59A752',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerRow: {
    marginBottom: 10,
  },
  dataPedido: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusPedido: {
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: 14,
  },
  produtoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#3C8C3A',
    borderRadius: 8,
    padding: 10,
  },
  imagePlaceholder: {
    width: 30,
    height: 30,
    backgroundColor: '#264D26',
    borderRadius: 5,
    marginRight: 10,
  },
  produtoNome: {
    flex: 1,
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  qtd: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  produtor: {
    marginTop: 10,
    color: 'white',
    textAlign: 'right',
    fontStyle: 'italic',
    fontSize: 13,
  },
});

export default PedidosScreen;
