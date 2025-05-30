

import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MissionReportScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
    

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image 
            source={require('./assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.mainTitle}>Relatório de missões</Text>

        {[
          'Chocolat Festival',
          'Bean to Bar Chocolate Week',
          'Choklad Festivalen',
          'The Chocolate Show',
          'Salon du Chocolat',
          'CioccolaTò',
          'The Northwest Chocolate Festival',
        ].map((event, index) => (
          <View key={index} style={styles.card}>
            <Text style={index < 2 ? styles.cardTitle : styles.cardText}>{event}</Text>
          </View>
        ))}
      </ScrollView>

    <TouchableOpacity style={styles.addButton} onPress={() => router.push('/relatorioEventos2Screen')}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#01923F',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 70, 
    paddingBottom: 80, 
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 15,
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#FFAA39',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
    marginLeft: -2,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 180,
    marginTop: -60,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#59A752',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',  
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center', 
  },
  cardText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center', 
  },
  addButton: {
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
  },
  addButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MissionReportScreen;
