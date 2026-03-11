import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";

// ESTA LINHA É O SEGREDO: O endereço do "cérebro" do banco
import GestorDados from "./dados/GestorDados";
import ProdutoItem from "./ProdutoItem";
import { styles } from "./CommonStyles";

export default function ProdutoLista({ navigation }) {
  // Criamos uma instância do gestor
  const gestor = new GestorDados();
  const [produtos, setProdutos] = useState([]);
  const isFocused = useIsFocused();

  // Toda vez que a tela focar, buscamos os dados
  // Buscando os dados agora direto do SQL
  useEffect(() => {
    const objs = gestor.obterTodos();
    setProdutos(objs);
  }, [isFocused]);

  function excluirProduto(codigo) {
    gestor.remover(codigo);
    const objs = gestor.obterTodos();
    setProdutos(objs);
  }
  const myKeyExtractor = (item) => {
    return item.codigo.toString();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NovoProd")}
      >
        <Text style={styles.buttonTextBig}>Novo Produto</Text>
      </TouchableOpacity>

      <FlatList
        style={styles.scrollContainer}
        data={produtos}
        contentContainerStyle={styles.itemsContainer}
        keyExtractor={myKeyExtractor}
        renderItem={({ item }) => (
          <ProdutoItem
            onDelete={() => excluirProduto(item.codigo)}
            produto={item}
          />
        )}
      />
    </View>
  );
}
