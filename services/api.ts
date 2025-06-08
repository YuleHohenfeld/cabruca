// Conteúdo do arquivo: src/services/api.ts

import axios from 'axios';

// O endereço do seu servidor.
// Se estiver testando no emulador Android, use 'http://10.0.2.2:8007'
// Para iOS ou web, 'http://localhost:8007' funciona.
const api = axios.create({
baseURL: 'http://192.168.0.66:8007'

});

export default api;