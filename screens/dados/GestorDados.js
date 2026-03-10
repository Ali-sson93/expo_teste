import AsyncStorage from "@react-native-async-storage/async-storage";
// Note os dois pontos (../../) para achar a pasta models saindo de dentro de 'dados'
import { Produto } from "../../models/Produto";

class GestorDados {
  async apagarTudo() {
    await AsyncStorage.clear();
  }

  // Remover um produto pelo código
  async remover(codigo) {
    try {
      await AsyncStorage.removeItem(codigo.toString());
    } catch (e) {
      console.error("Erro ao remover do banco", e);
    }
  }

  // Buscar todos os produtos salvos
  async obterTodos() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const itens = await AsyncStorage.multiGet(keys);

      // Transforma o texto do banco de volta em objetos de Produto
      return itens.map((item) => {
        return JSON.parse(item[1]);
      });
    } catch (e) {
      console.error("Erro ao buscar dados", e);
      return [];
    }
  }

  async apagarTudo() {
    await AsyncStorage.clear();
  }
}

// O segredo é exportar a classe já instanciada (new)
export default GestorDados;
