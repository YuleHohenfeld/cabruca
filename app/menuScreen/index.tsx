import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function MenuScreen() {
       const router = useRouter();
    
  return (
    <View style={styles.container}>


          

       <View style={styles.imageContainer}>
        <Image source={require('./assets/image.png')} style={styles.logoImage} />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/pedidosScreen')}>
        <Text style={styles.buttonText}>Pedidos</Text>
      </TouchableOpacity>
<TouchableOpacity style={styles.button} onPress={() => router.push('/produtosScreen')}>
  <Text style={styles.buttonText}>Produtos</Text>
</TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/relatorioEventosScreen')}>
        <Text style={styles.buttonText}>Relatório</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/mensagensScreen')}>
        <Text style={styles.buttonText}>Mensagem</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01923F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: 50, 
    zIndex: 1,
    alignItems: 'center',
  },
  logoImage: {
    width: 300,  
    height: 190, 
        transform: [{ translateX: -12 }],
    resizeMode: 'contain',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 60,
    marginVertical: 12,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});