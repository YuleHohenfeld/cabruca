import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {

    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
  
      <Stack.Screen 
        name="loginScreen/index" 
        options={{ 
          title: 'Login',
          headerShown: false
        }} 
      />

      <Stack.Screen 
  name="menuScreen/index" 
    options={{ 
          title: 'Menu',
          headerShown: false
        }}
/>

    <Stack.Screen 
  name="produtosScreen/index" 
 options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }}

/>


<Stack.Screen 
  name="detalheProduto1Screen/index" 
     options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }}
        
/>

<Stack.Screen 
  name="pedirProduto1Screen/index" 
  options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }} 
        
/>

<Stack.Screen 
  name="detalheProduto2Screen/index" 
     options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }}
        
/>

<Stack.Screen 
  name="pedirProduto2Screen/index" 
  options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }} 
        
/>


<Stack.Screen 
  name="detalheProduto3Screen/index" 
     options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }}
        
/>

<Stack.Screen 
  name="pedirProduto3Screen/index" 
  options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }} 
        
/>

<Stack.Screen 
  name="detalheProduto4Screen/index" 
     options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }}
        
/>

  <Stack.Screen 
  name="pedidosScreen/index" 
   options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }}

/>


<Stack.Screen 
  name="relatorioEventosScreen/index" 
   options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }}

/>

<Stack.Screen 
  name="relatorioEventos2Screen/index" 
   options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }}

/>

<Stack.Screen 
  name="nomeEventoScreen/index" 
  options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }} 
        
/>

  <Stack.Screen 
  name="mensagensScreen/index" 
  options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }}

/>

 <Stack.Screen 
  name="mensagensRecebidasScreen/index" 
options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }}

/>

<Stack.Screen 
  name="mensagensEnviadasScreen/index" 
 options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }}

/>
 
<Stack.Screen 
  name="recuperacaoSenhaScreen/index" 
  options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }} 
/>

<Stack.Screen 
  name="verificacaoSenhaScreen/index" 
  options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }} 
        
/>

<Stack.Screen 
  name="redefirSenhaScreen/index" 
 options={{ 
    title: '',
    headerBackTitle: 'Voltar', 
    headerShown: true, 
    headerBackVisible: true, 
    headerStyle: {
      backgroundColor: '#01923F', 
    },
    headerTintColor: '#FFA500', 
  }} 
/>


      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}